export const Marks = ({
    data, circleRadius,
    xScale, xAccessor, xLabel,
    yScale, yAccessor, yLabel,
    colorScale, colorAccessor    
}) => {    

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
