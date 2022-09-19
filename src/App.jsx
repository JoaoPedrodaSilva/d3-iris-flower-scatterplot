import { useState } from "react"
import { scaleLinear, scaleOrdinal, extent, format } from "d3"
import { useFetchData } from "./useFetchData"

//importing components
import { Dropdown } from "./components/Dropdown"
import { Title } from "./components/Title"
import { AxisBottom } from "./components/AxisBottom"
import { LabelBottom } from "./components/LabelBottom"
import { AxisLeft } from "./components/AxisLeft"
import { LabelLeft } from "./components/LabelLeft"
import { Marks } from "./components/Marks"
import { ColorLegend } from "./components/ColorLegend"
import { Source } from "./components/Source"


export const App = () => {
    //states and variables
    const data = useFetchData()
    const [hoveredSpecie, setHoveredSpecie] = useState(null)

    const attributes = [
        { value: "sepal_length", label: "Sepal Length" },
        { value: "sepal_width", label: "Sepal Width" },
        { value: "petal_length", label: "Petal Length" },
        { value: "petal_width", label: "Petal Width" },
        // { value: "species", label: "Species" }
    ]

    const getAttributeLabel = value => {
        let desiredLabel
        attributes.map(attribute => {
            if (attribute.value === value) {
                desiredLabel = attribute.label
            }
        })
        return desiredLabel
    }

    const width = 960 //gotta change it in the index.css #root selector too
    const height = 650 //gotta change it in the index.css #root selector too
    const margin = { top: 60, right: 20, bottom: 170, left: 80 }
    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom
    const circleRadius = 6

    const [xAttribute, setXAttribute] = useState('petal_length')
    const xAccessor = d => d[xAttribute]
    const xAccessorTickFormat = format(".1f")
    const xLabel = getAttributeLabel(xAttribute)


    const [yAttribute, setYAttribute] = useState('sepal_width')
    const yAccessor = d => d[yAttribute]
    const yAccessorTickFormat = format(".1f")
    const yLabel = getAttributeLabel(yAttribute)


    const colorAccessor = d => d.species


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //filter data based on the specie hovered
    const filteredData = data.filter(d => hoveredSpecie === colorAccessor(d))


    //scales
    const xScale = scaleLinear()
        // .domain([max(data, xAccessor), max(data, xAccessor)]) could be like that
        .domain(extent(data, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        // .domain([min(data, yAccessor), max(data, yAccessor)]) could be like that
        .domain(extent(data, yAccessor))
        .range([innerHeight, 0])
        .nice()

    const colorScale = scaleOrdinal()
        .domain(data.map(colorAccessor))
        .range(["#e6842a", "#137b80", "#8e6c8a"])


    //render scatterplot
    return (
        <>
            <div className="dropdown-container">
                <Dropdown
                    options={attributes}
                    id="left-dropdown"
                    label="Left"
                    selectedOption={yAttribute}
                    setAttribute={setYAttribute}
                />

                <Dropdown
                    options={attributes}
                    id="bottom-dropdown"
                    label="Bottom"
                    selectedOption={xAttribute}
                    setAttribute={setXAttribute}
                />
            </div>

            <div className="responsive-div">
                <svg
                    preserveAspectRatio="xMinYMin meet"
                    viewBox={`0 0 ${width} ${height}`}
                >
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <Title
                            width={width}
                        />

                        <AxisBottom
                            xScale={xScale}
                            innerHeight={innerHeight}
                            tickFormat={xAccessorTickFormat}
                        />
                        <LabelBottom label={xLabel} />

                        <AxisLeft
                            yScale={yScale}
                            innerWidth={innerWidth}
                            tickFormat={yAccessorTickFormat}
                        />
                        <LabelLeft label={yLabel} />

                        <g opacity={ hoveredSpecie ? 0.3 : 1}>
                            <Marks
                                data={data}
                                circleRadius={circleRadius}

                                xScale={xScale}
                                xAccessor={xAccessor}
                                xLabel={xLabel}

                                yScale={yScale}
                                yAccessor={yAccessor}
                                yLabel={yLabel}

                                colorScale={colorScale}
                                colorAccessor={colorAccessor}
                                //color label
                            />
                        </g>

                        <Marks
                            data={filteredData}
                            circleRadius={circleRadius}

                            xScale={xScale}
                            xAccessor={xAccessor}
                            xLabel={xLabel}

                            yScale={yScale}
                            yAccessor={yAccessor}
                            yLabel={yLabel}

                            colorScale={colorScale}
                            colorAccessor={colorAccessor}
                            //color label
                        />

                        <ColorLegend
                            colorScale={colorScale}
                            circleRadius={circleRadius}
                            onHover={setHoveredSpecie}
                            hoveredSpecie={hoveredSpecie}
                        />

                        <Source />
                    </g>
                </svg>
            </div>
        </>
    )
}
