import { useState } from "react"
import { scaleLinear, extent, format } from "d3"
import { useDataContext } from "./dataContext"
import { useFetchData } from "./useFetchData"

//importing components
import { Dropdown } from "./components/Dropdown"
import { Title } from "./components/Title"
import { AxisBottom } from "./components/AxisBottom"
import { LabelBottom } from "./components/LabelBottom"
import { AxisLeft } from "./components/AxisLeft"
import { LabelLeft } from "./components/LabelLeft"
import { Marks } from "./components/Marks"
import { Source } from "./components/Source"


export const App = () => {
    //states and variables
    const { data } = useDataContext()

    const attributes = [
        { value: "sepal_length", label: "Sepal Length" },
        { value: "sepal_width", label: "Sepal Width" },
        { value: "petal_length", label: "Petal Length" },
        { value: "petal_width", label: "Petal Width" },
        { value: "species", label: "Species" }
    ]

    const getLabel = value => {
        let desiredLabel
        attributes.map(attribute => {
            if (attribute.value === value) {
                desiredLabel = attribute.label
            }
        })
        return desiredLabel
    }

    const width = 960
    const height = 500
    const margin = { top: 50, right: 20, bottom: 60, left: 100 }
    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom
    const circleRadius = 6

    const [xAttribute, setXAttribute] = useState('petal_length')
    const xAccessor = d => d[xAttribute]
    const xLabel = getLabel(xAttribute)
    const xAccessorTickFormat = tick => format(".1f")(tick)

    const [yAttribute, setYAttribute] = useState('sepal_width')
    const yAccessor = d => d[yAttribute]
    const yLabel = getLabel(yAttribute)
    const yAccessorTickFormat = tick => format(".1f")(tick)


    //fetch data
    useFetchData()


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //scales
    const xScale = scaleLinear()
        // .domain([max(data, xAccessor), max(data, xAccessor)]) could be like that
        .domain(extent(data, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        // .domain([min(data, yAccessor), max(data, yAccessor)]) could be like that
        .domain(extent(data, yAccessor))
        .range([0, innerHeight])
        .nice()

    //render scatterplot
    return (
        <>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem",
                marginBottom: "2rem"
            }}>
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

                        <LabelBottom
                            width={width}
                            height={height}
                            label={xLabel}
                        />

                        <AxisLeft
                            yScale={yScale}
                            innerWidth={innerWidth}
                            tickFormat={yAccessorTickFormat}
                        />

                        <LabelLeft
                            width={width}
                            height={height}
                            label={yLabel}
                        />

                        <Marks
                            xScale={xScale}
                            yScale={yScale}
                            xAccessor={xAccessor}
                            yAccessor={yAccessor}
                            circleRadius={circleRadius}
                        />

                        <Source
                            innerWidth={innerWidth}
                            innerHeight={innerHeight}
                        />

                    </g>
                </svg>
            </div>
        </>
    )
}
