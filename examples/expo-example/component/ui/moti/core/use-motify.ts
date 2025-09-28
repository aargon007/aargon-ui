import type {
  PresenceContext,
  usePresence as useFramerPresence,
} from 'framer-motion'
import { useEffect, useMemo } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  ReduceMotion,
} from 'react-native-reanimated'
import type {
  AnimationCallback,
  WithDecayConfig,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'

import { PackageName } from './constants/package-name'
import type {
  InlineOnDidAnimate,
  MotiProps,
  MotiTransition,
  SequenceItem,
  Transforms,
  TransitionConfig,
  WithTransition,
  SequenceItemObject,
  TransitionType,
  TransitionDelayConfig,
} from './types'

const debug = (...args: any[]) => {
  'worklet'

  // @ts-ignore
  if (!global.shouldDebugMoti) {
    return
  }

  if (args) {
    // hi
  }
  console.log('[moti]', ...args)
}

const isColor = (styleKey: string) => {
  'worklet'

  return Boolean(
    {
      backgroundColor: true,
      borderBottomColor: true,
      borderLeftColor: true,
      borderRightColor: true,
      borderTopColor: true,
      color: true,
      shadowColor: true,
      borderColor: true,
      borderEndColor: true,
      borderStartColor: true,
    }[styleKey]
  )
}

const hasInlineOnDidAnimate = (
  value: any
): value is {
  value: any
  onDidAnimate: InlineOnDidAnimate<any>
} => {
  'worklet'

  return typeof value === 'object' && value !== null && 'onDidAnimate' in value
}

const isTransform = (
  styleKey: string
): styleKey is string & keyof Transforms => {
  'worklet'

  const transforms: Record<keyof Transforms, true> = {
    matrix: true,
    perspective: true,
    rotate: true,
    rotateX: true,
    rotateY: true,
    rotateZ: true,
    scale: true,
    scaleX: true,
    scaleY: true,
    translateX: true,
    translateY: true,
    skewX: true,
    skewY: true,
  }

  return Boolean(transforms[styleKey as keyof Transforms])
}

function animationDelay<Animate>(
  _key: string,
  transition: MotiTransition<Animate> | undefined,
  defaultDelay?: number
) {
  'worklet'

  const key = _key as keyof Animate
  let delayMs: unknown = defaultDelay

  if (transition?.[key]?.delay != null) {
    delayMs = transition?.[key]?.delay
  } else if (transition?.delay != null) {
    delayMs = transition.delay
  }

  return {
    delayMs,
  } as {
    delayMs: TransitionDelayConfig['delay']
  }
}

// a looser type for internal use
type Transition<Animate> = MotiTransition<Animate> & {
  reduceMotion?: ReduceMotion
} & Record<string, any>

type AnimationConfig =
  | WithTimingConfig
  | WithSpringConfig
  | WithDecayConfig
  | {}

type AnimationFactory = (
  value: any,
  config: any,
  callback: AnimationCallback
) => any

type AnimationConfigResult = {
  animation: AnimationFactory
  config: AnimationConfig
  reduceMotion: ReduceMotion
  repeatReverse: boolean
  repeatCount: number
  shouldRepeat: boolean
}

// distributive version of built-in Omit type
type Omit<T, K extends string> = T extends object
  ? { [P in Exclude<keyof T, K>]: T[P] }
  : never

type AllKeys<T> = T extends object ? keyof T : never

// use a Record type to declare keys with an exhaustive check
function typedObjectKeys<T>(obj: Record<AllKeys<T>, true>) {
  'worklet'

  return Object.keys(obj) as AllKeys<T>[]
}

function animationConfig<Animate>(
  key: string,
  transition: Transition<Animate> | undefined
): AnimationConfigResult {
  'worklet'

  let animation: AnimationFactory | undefined
  let config: AnimationConfig & Record<string, any> = {}
  let reduceMotion = ReduceMotion.System
  let repeatCount: number
  let repeatReverse: boolean

  if (transition) {
    // key-specific transition config is used to override the root transition config
    const overrides: (TransitionConfig & Record<string, any>) | undefined =
      transition[key]

    let transitionType: TransitionType =
      overrides?.type ??
      transition.type ??
      (key === 'opacity' || isColor(key) ? 'timing' : 'spring')

    const loop = overrides?.loop ?? transition?.loop

    repeatCount =
      loop == null ? overrides?.repeat ?? transition.repeat ?? 0 : loop ? -1 : 0

    repeatReverse =
      overrides?.repeatReverse ?? transition?.repeatReverse ?? true

    let configKeys: string[] | undefined

    if (transitionType === 'timing') {
      animation = withTiming
      configKeys = typedObjectKeys<Omit<WithTimingConfig, 'reduceMotion'>>({
        duration: true,
        easing: true,
      })
    } else if (transitionType === 'spring') {
      animation = withSpring
      configKeys = typedObjectKeys<Omit<WithSpringConfig, 'reduceMotion'>>({
        clamp: true,
        damping: true,
        dampingRatio: true,
        duration: true,
        energyThreshold: true,
        mass: true,
        overshootClamping: true,
        stiffness: true,
        velocity: true,
      })
    } else if (transitionType === 'decay') {
      animation = withDecay
      configKeys = typedObjectKeys<Omit<WithDecayConfig, 'reduceMotion'>>({
        clamp: true,
        deceleration: true,
        rubberBandEffect: true,
        rubberBandFactor: true,
        velocity: true,
        velocityFactor: true,
      })
    } else {
      repeatCount = 0
    }

    configKeys?.forEach((configKey) => {
      const configValue = overrides?.[configKey] ?? transition[configKey]
      if (configValue !== undefined) {
        config[configKey] = configValue
      }
    })

    if (animation) {
      // root-level reduceMotion takes precedence
      reduceMotion =
        transition?.reduceMotion ??
        overrides?.reduceMotion ??
        reduceMotion
    }
  } else {
    repeatCount = 0
    repeatReverse = true
  }

  return {
    animation: animation ?? ((value: any) => value),
    config,
    reduceMotion,
    repeatReverse,
    repeatCount,
    shouldRepeat: !!repeatCount,
  }
}

const getSequenceArray = (
  sequenceKey: string,
  sequenceArray: SequenceItem<any>[],
  delayMs: number | undefined,
  config: object,
  animation: AnimationFactory,
  callback: (
    completed: boolean | undefined,
    value: any | undefined,
    info: {
      attemptedSequenceValue: any
    }
  ) => void
) => {
  'worklet'

  const sequence: any[] = []

  for (const step of sequenceArray) {
    const shouldPush =
      typeof step === 'object'
        ? step && step?.value != null && step?.value !== false
        : step != null && step !== false
    let stepOnDidAnimate: SequenceItemObject<any>['onDidAnimate']
    if (shouldPush) {
      let stepDelay = delayMs
      let stepValue = step
      let stepReduceMotion = ReduceMotion.System
      let stepConfig = Object.assign({}, config)
      let stepAnimation = animation
      if (typeof step === 'object') {
        // not allowed in Reanimated: { delay, value, ...transition } = step
        const stepTransition = Object.assign({}, step)

        delete stepTransition.delay
        delete stepTransition.value

        const {
          config: inlineStepConfig,
          animation,
          reduceMotion,
        } = animationConfig(sequenceKey, stepTransition)

        stepConfig = Object.assign({}, stepConfig, inlineStepConfig)
        stepAnimation = animation
        stepReduceMotion = reduceMotion

        if (step.delay != null) {
          stepDelay = step.delay
        }
        stepValue = step.value
        stepOnDidAnimate = step.onDidAnimate
      }

      const sequenceValue = stepAnimation(
        stepValue,
        stepConfig,
        (completed = false, maybeValue) => {
          'worklet'
          callback(completed, maybeValue, {
            attemptedSequenceValue: stepValue,
          })
          if (stepOnDidAnimate) {
            runOnJS(stepOnDidAnimate)(completed, maybeValue, {
              attemptedSequenceItemValue: stepValue,
              attemptedSequenceArray: maybeValue,
            })
          }
        }
      )
      if (stepDelay != null) {
        sequence.push(withDelay(stepDelay, sequenceValue, stepReduceMotion))
      } else {
        sequence.push(sequenceValue)
      }
    }
  }

  return sequence
}

export function useMotify<Animate>({
  animate: animateProp,
  from: fromProp = false,
  transition: transitionProp,
  exitTransition: exitTransitionProp,
  delay: defaultDelay,
  state,
  stylePriority = 'animate',
  onDidAnimate,
  exit: exitProp,
  animateInitialState = false,
  usePresenceValue,
  presenceContext,
}: MotiProps<Animate> & {
  presenceContext?: Pick<
    NonNullable<React.ContextType<typeof PresenceContext>>,
    'custom' | 'initial'
  > | null
  usePresenceValue?: ReturnType<typeof useFramerPresence>
}) {
  const isMounted = useSharedValue(false)
  const [isPresent, safeToUnmount] = usePresenceValue ?? []

  const disableInitialAnimation =
    presenceContext?.initial === false && !animateInitialState

  const { custom, reanimatedSafeToUnmount, reanimatedOnDidAnimate } = useMemo(
    () => ({
      custom: () => {
        'worklet'
        return presenceContext?.custom
      },
      reanimatedSafeToUnmount: () => {
        safeToUnmount?.()
      },
      reanimatedOnDidAnimate: (
        ...args: Parameters<NonNullable<typeof onDidAnimate>>
      ) => {
        onDidAnimate?.(...args)
      },
    }),
    [onDidAnimate, presenceContext, safeToUnmount]
  )

  const hasExitStyle = Boolean(
    typeof exitProp === 'function' ||
    (typeof exitProp === 'object' &&
      exitProp &&
      Object.keys(exitProp).length > 0)
  )

  const style = useAnimatedStyle(() => {
    const final: Record<string, any> & {
      transform: Transforms[]
    } = {
      transform: [],
    }

    const variantStyle: Animate & WithTransition = state?.__state?.value || {}

    let animateStyle: Animate
    if (animateProp && 'value' in animateProp) {
      animateStyle = (animateProp.value || {}) as Animate
    } else {
      animateStyle = (animateProp || {}) as Animate
    }

    debug('style', animateStyle)

    const initialStyle = fromProp || {}
    let exitStyle = exitProp || {}
    if (typeof exitStyle === 'function') {
      exitStyle = exitStyle(custom())
    }

    const isExiting = !isPresent && hasExitStyle

    let mergedStyles: Record<string, any> = {}
    if (stylePriority === 'state') {
      mergedStyles = Object.assign({}, animateStyle, variantStyle)
    } else {
      mergedStyles = Object.assign({}, variantStyle, animateStyle)
    }

    if (
      !isMounted.value &&
      !disableInitialAnimation &&
      Object.keys(initialStyle).length
    ) {
      mergedStyles = initialStyle
    } else {
      mergedStyles = Object.assign({}, initialStyle, mergedStyles)
    }

    if (isExiting && exitStyle) {
      mergedStyles = Object.assign({}, exitStyle)
    }

    const exitingStyleProps: Record<string, boolean> = {}

    const disabledExitStyles = new Set([
      'position',
      'zIndex',
      'borderTopStyle',
      'borderBottomStyle',
      'borderLeftStyle',
      'borderRightStyle',
      'borderStyle',
      'pointerEvents',
      'outline',
    ])
    Object.keys(exitStyle || {}).forEach((key) => {
      if (!disabledExitStyles.has(key)) {
        exitingStyleProps[key] = true
      }
    })

    // allow shared values as transitions
    let transition: MotiTransition | undefined
    if (transitionProp && 'value' in transitionProp) {
      transition = transitionProp.value
    } else if (typeof transitionProp == 'function') {
      transition = transitionProp(custom())
    } else {
      transition = transitionProp
    }

    // let the state prop drive transitions too
    if (variantStyle.transition) {
      transition = Object.assign({}, transition, variantStyle.transition)
    }

    if (isExiting && exitTransitionProp) {
      let exitTransition: MotiTransition | undefined
      if (exitTransitionProp && 'value' in exitTransitionProp) {
        exitTransition = exitTransitionProp.value
      } else if (typeof exitTransitionProp == 'function') {
        exitTransition = exitTransitionProp(custom())
      } else {
        exitTransition = exitTransitionProp
      }

      transition = Object.assign({}, transition, exitTransition)
    }

    // need to use forEach to work with Hermes...https://github.com/nandorojo/moti/issues/214#issuecomment-1399055535
    Object.keys(mergedStyles).forEach((key) => {
      let value = mergedStyles[key]

      let inlineOnDidAnimate: InlineOnDidAnimate<any> | undefined
      if (hasInlineOnDidAnimate(value)) {
        inlineOnDidAnimate = value.onDidAnimate
        value = value.value
      }

      const {
        animation,
        config,
        reduceMotion,
        shouldRepeat,
        repeatCount,
        repeatReverse,
      } = animationConfig(key, transition)

      const callback: (
        completed: boolean | undefined,
        value: any | undefined,
        info?: {
          attemptedSequenceValue?: any
          transformKey?: string
        }
      ) => void = (completed = false, recentValue, info) => {
        if (onDidAnimate) {
          runOnJS(reanimatedOnDidAnimate)(key as any, completed, recentValue, {
            attemptedValue: value,
            attemptedSequenceItemValue: info?.attemptedSequenceValue,
          })
        }
        if (inlineOnDidAnimate) {
          runOnJS(inlineOnDidAnimate)(completed, recentValue, {
            attemptedValue: value,
          })
        }
        if (isExiting) {
          exitingStyleProps[key] = false
          const areStylesExiting =
            Object.values(exitingStyleProps).some(Boolean)
          // if this is true, then we've finished our exit animations
          if (!areStylesExiting) {
            runOnJS(reanimatedSafeToUnmount)()
          }
        }
      }

      let { delayMs } = animationDelay(key, transition, defaultDelay)

      if (value == null || value === false) {
        // skip missing values
        // this is useful if you want to do {opacity: loading && 1}
        // without this, those values will break I think
        return
      }

      if (key === 'transform') {
        if (!Array.isArray(value)) {
          console.error(
            `[${PackageName}]: Invalid transform value. Needs to be an array.`
          )
        } else {
          value.forEach((transformObject) => {
            const transformKey = Object.keys(
              transformObject
            )[0] as keyof Transforms
            const transformValue = transformObject[transformKey]
            const transform = {} as Transforms

            if (Array.isArray(transformValue)) {
              // we have a sequence in this transform...
              const sequence = getSequenceArray(
                transformKey,
                transformValue,
                delayMs,
                config,
                animation,
                callback
              )

              if (sequence.length) {
                let finalValue = withSequence(sequence[0], ...sequence.slice(1))
                if (shouldRepeat) {
                  finalValue = withRepeat(
                    finalValue,
                    repeatCount,
                    repeatReverse,
                    callback,
                    reduceMotion
                  )
                }
                transform[transformKey] = finalValue
              }
            } else {
              const transformConfig = transition?.[transformKey]
              if (transformConfig?.delay != null) {
                delayMs = transformConfig.delay
              }

              let configKey: string = transformKey
              if (
                transition &&
                'transform' in transition &&
                !(configKey in transition)
              ) {
                configKey = 'transform'
              }

              const {
                animation,
                config,
                shouldRepeat,
                repeatCount,
                repeatReverse,
              } = animationConfig(configKey, transition)

              let finalValue = animation(transformValue, config, callback)
              if (shouldRepeat) {
                finalValue = withRepeat(
                  finalValue,
                  repeatCount,
                  repeatReverse,
                  undefined,
                  reduceMotion
                )
              }
              if (delayMs != null) {
                transform[transformKey] = withDelay(
                  delayMs,
                  finalValue,
                  reduceMotion
                )
              } else {
                transform[transformKey] = finalValue
              }
            }

            if (Object.keys(transform).length) {
              final.transform.push(transform)
            }
          })
        }
      } else if (Array.isArray(value)) {
        // we have a sequence

        const sequence = getSequenceArray(
          key,
          value,
          delayMs,
          config,
          animation,
          callback
        )
        if (sequence.length) {
          let finalValue = withSequence(...sequence)
          if (shouldRepeat) {
            finalValue = withRepeat(
              finalValue,
              repeatCount,
              repeatReverse,
              undefined,
              reduceMotion
            )
          }

          if (isTransform(key)) {
            // we have a sequence of transforms
            const transform = {} as Transforms
            transform[key] = finalValue
            final.transform.push(transform)
          } else {
            // we have a normal sequence of items
            // shadows not supported
            final[key] = finalValue
          }
        }
      } else if (isTransform(key)) {
        const transform = {} as Transforms

        let finalValue = animation(value, config, callback)
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          )
        }
        const transformConfig = transition?.[key]
        if (transformConfig?.delay != null) {
          delayMs = transformConfig.delay
        }
        if (delayMs != null) {
          transform[key] = withDelay(delayMs, finalValue, reduceMotion)
        } else {
          transform[key] = finalValue
        }

        final.transform.push(transform)
      } else if (typeof value === 'object') {
        // shadows
        final[key] = {}

        for (const innerStyleKey in value) {
          let finalValue = animation(value[innerStyleKey], config, callback)
          if (shouldRepeat) {
            finalValue = withRepeat(
              finalValue,
              repeatCount,
              repeatReverse,
              undefined,
              reduceMotion
            )
          }

          if (delayMs != null) {
            final[key][innerStyleKey] = withDelay(
              delayMs,
              finalValue,
              reduceMotion
            )
          } else {
            final[key][innerStyleKey] = finalValue
          }
        }
      } else {
        let finalValue = animation(value, config, callback)
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          )
        }

        if (delayMs != null && typeof delayMs === 'number') {
          final[key] = withDelay(delayMs, finalValue, reduceMotion)
        } else {
          final[key] = finalValue
        }
      }
    })

    if (!final.transform.length) {
      final.transform = undefined!
    }

    return final
  }, [
    animateProp,
    custom,
    defaultDelay,
    disableInitialAnimation,
    exitProp,
    exitTransitionProp,
    fromProp,
    hasExitStyle,
    isMounted,
    isPresent,
    onDidAnimate,
    reanimatedOnDidAnimate,
    reanimatedSafeToUnmount,
    state,
    stylePriority,
    transitionProp,
  ])

  useEffect(
    function allowUnMountIfMissingExit() {
      if (fromProp && isMounted.value === false) {
        // put this here just to avoid having another useEffect
        isMounted.value = true
      }
      if (!isPresent && !hasExitStyle) {
        reanimatedSafeToUnmount()
      }
    },
    [hasExitStyle, isPresent, reanimatedSafeToUnmount]
  )

  return {
    style,
  }
}