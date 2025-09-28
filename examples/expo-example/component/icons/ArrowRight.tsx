import Svg, { Path, type SvgProps } from 'react-native-svg';

function ArrowRight({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={17} height={15} viewBox="0 0 17 15" fill="none" {...props}>
            <Path
                d="M15.75 7.726h-15M9.7 1.701l6.05 6.024L9.7 13.75"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default ArrowRight;
