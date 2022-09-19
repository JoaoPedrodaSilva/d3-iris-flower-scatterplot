export const LabelLeft = ({ label }) => (
    <g transform={`translate(-50, 250)`}>
        <text
            transform="rotate(-90)"
            style={{ fill: "#635f5d" }}
        >
            {`${label} (cm)`}
        </text>
    </g>
)
