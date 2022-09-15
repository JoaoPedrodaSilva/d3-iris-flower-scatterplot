export const LabelBottom = ({ width, height, label }) => (
    <g transform={`translate(${width / 2.75}, ${height - 70})`}>
        <text style={{ fill: "#635f5d" }}>
            {label}
        </text>
    </g>
)

