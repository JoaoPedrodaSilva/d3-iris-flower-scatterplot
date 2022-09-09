export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => (
    xScale.ticks().map((tick, index) => (
        <g key={index} transform={`translate(${xScale(tick)}, 0)`}>
            <line y2={innerHeight} stroke="#c0c0bb" />
            <text
                y={innerHeight}
                style={{ textAnchor: "middle", fill: "#635f5d" }}
                dy="1.2rem"
            >
                {tickFormat(tick)}
            </text>
        </g>
    ))
)

