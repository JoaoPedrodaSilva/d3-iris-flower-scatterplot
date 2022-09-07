export const LabelLeft = ({ height }) => (
    <g transform={`translate(${-50}, ${height / 2})`}>
        <text
            transform="rotate(-90)"
            style={{ fill: "#635f5d" }}
        >
            Sepal Width
        </text>
    </g>
)
