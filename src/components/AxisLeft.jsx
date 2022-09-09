export const AxisLeft = ({ yScale, innerWidth, tickFormat }) => (
    yScale.ticks().map((tick, index) => (
        <g key={index} transform={`translate(0, ${yScale(tick)})`}>
            <line x2={innerWidth} stroke="#c0c0bb " />
            <text
                style={{ textAnchor: "end", fill: "#635f5d" }}
                dx="-0.8rem"
            >
                {tickFormat(tick)}
            </text>
        </g>
    ))
)

