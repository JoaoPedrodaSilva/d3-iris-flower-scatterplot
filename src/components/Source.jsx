export const Source = ({ innerWidth, innerHeight }) => (
    <g transform={`translate(${innerWidth - 278}, ${innerHeight + 50})`}>
        <text style={{ fill: "#635f5d", fontSize: "0.7rem" }}>
            Source:
            <a
                style={{ fill: "#635f5d" }}
                href="https://archive.ics.uci.edu/ml/datasets/Iris"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://archive.ics.uci.edu/ml/datasets/Iris
            </a>
        </text>
    </g>
)
