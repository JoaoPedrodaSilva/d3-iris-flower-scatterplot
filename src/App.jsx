import { scaleLinear, extent, format } from "d3"
import { useDataContext } from "./dataContext"
import { useFetchData } from "./useFetchData"
import { Marks } from "./components/Marks"
import { AxisBottom } from "./components/AxisBottom"
import { LabelBottom } from "./components/LabelBottom"
import { AxisLeft } from "./components/AxisLeft"
import { LabelLeft } from "./components/LabelLeft"
import { Title } from "./components/Title"
import { Source } from "./components/Source"

export const App = () => {
    //states and variables
    const { data } = useDataContext()

    const width = 960
    const height = 500
    const margin = { top: 50, right: 20, bottom: 60, left: 100 }
    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom
    const circleRadius = 6

    const xAccessor = d => d.petal_length
    const yAccessor = d => d.sepal_width

    const yAccessorTickFormat = tick => format(".1f")(tick)
    const xAccessorTickFormat = tick => format(".1f")(tick)


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
                    />

                    <AxisLeft
                        yScale={yScale}
                        innerWidth={innerWidth}
                        tickFormat={yAccessorTickFormat}
                    />

                    <LabelLeft
                        width={width}
                        height={height}
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
    )
}
