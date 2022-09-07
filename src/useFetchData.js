import { useEffect } from "react"
import { csv } from "d3"
import { useDataContext } from "./dataContext"

export const useFetchData = () => {
    const { setData } = useDataContext()

    useEffect(() => {
        const preliminaryData = []

        csv("https://gist.githubusercontent.com/JoaoPedrodaSilva/f79689f2711a1f5d477948314af528f2/raw/0ea60dadb1b516eec44c0f0ea36389e31501e44b/Iris%2520Flower%2520Dataset")
            .then(response => {
                response.map(row => (
                    preliminaryData.push({
                        sepal_length: Number(row.sepal_length),
                        sepal_width: Number(row.sepal_width),
                        petal_length: Number(row.petal_length),
                        petal_width: Number(row.petal_width),
                        species: row.species
                    })
                ))
                setData(preliminaryData)
            })          
    }, [setData])
}