export const LabelLeft = ({ height, label }) => (
    <g transform={`translate(${-50}, ${height / 2})`}>
        <text
            transform="rotate(-90)"
            style={{ fill: "#635f5d" }}
        >
            {label}
        </text>
    </g>
)
