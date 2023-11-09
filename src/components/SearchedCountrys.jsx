import { render } from "@testing-library/react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function SearchedCountrys() {
    const {search} = useParams()
    const [countries, setCountries] = useState([])
    // console.log(search)
    fetch(`https://restcountries.com/v3.1/name/${search}`)
    .then(response => response.json())
    .then(data => setCountries(data))
    return(
        <div>
            <ul>
                {countries.map((list, index) => (
                    <li key={index}>{list.name.common}</li>
                ))}
            </ul>
        </div>
    )
};
