export const ColorLegend = ({ colorScale, circleRadius, onHover, hoveredSpecie }) => (
    <g transform={`translate(0, 520)`} >
        <text transform={`translate(-6, -25)`} fill="#635f5d">Species</text>
        {colorScale.domain().map((specie, index) => (
            <g
                key={index}
                transform={`translate(0, ${index * 25})`}
                fill="#635f5d"
                cursor="default"
                onMouseEnter={() => onHover(specie)}
                onMouseOut={() => onHover(null)}
                opacity={hoveredSpecie && specie !== hoveredSpecie ? 0.3 : 1}
            >
                <circle
                    r={circleRadius}
                    fill={colorScale(specie)}
                />
                <text dy=".32em" dx=".4em">
                    {specie}
                </text>
            </g>
        ))}
    </g>
)

