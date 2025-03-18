import Svg, { Path, type SvgProps } from 'react-native-svg';

function ArrowLeft({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={17} height={15} viewBox="0 0 17 15" fill="none" {...props}>
            <Path
                d="M1.25 7.274h15M7.3 13.299L1.25 7.275 7.3 1.25"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default ArrowLeft;
