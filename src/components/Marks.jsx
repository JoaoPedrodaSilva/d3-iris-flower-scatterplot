import { useDataContext } from '../dataContext'

export const Marks = ({xScale, yScale, xAccessor, yAccessor, circleRadius}) => {
    const {data} = useDataContext()

  return (
    data.map((d, i) => (
    <circle
        key={i}
        cx={xScale(xAccessor(d))}
        cy={yScale(yAccessor(d))}
            r={circleRadius}
    >
        Marks
    </circle>
    ))
  )
}
