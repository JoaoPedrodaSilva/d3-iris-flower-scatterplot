import { useDataContext } from '../dataContext'

export const Marks = ({
    xScale, xAccessor, xLabel,
    yScale, yAccessor, yLabel,
    colorScale, colorAccessor,
    circleRadius
}) => {
    const { data } = useDataContext()

    return (
        data.map((d, i) => (
            <circle
                key={i}
                cx={xScale(xAccessor(d))}
                cy={yScale(yAccessor(d))}
                r={circleRadius}
                fill={colorScale(colorAccessor(d))}
            >
                <title>{`${xLabel}: ${xAccessor(d)}  -  ${yLabel}: ${yAccessor(d)} - ${colorScale(colorAccessor(d))}`}</title>
            </circle>
        ))
    )
}
