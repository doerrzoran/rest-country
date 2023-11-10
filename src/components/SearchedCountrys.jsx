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

      let continents = []
    countries.map((country) => {
        // console.log(country.continents[0])
        continents.push(country.continents[0])
        continents = continents.filter((value, index) => continents.indexOf(value) === index)
        // console.log(continents)
    })

    return(
        <div>
            <ul>
                {
                    continents.map((continent) => {
                        return[
                            <h1>{continent}</h1>,
                            countries.filter((list) => 
                                list.continents[0] === continent)
                                .map((country) => (
                                    <li> {country.name.common} </li>
                                    )
                                )
                            ]
                        }
                    )
                }
            </ul>
        </div>
    )
};

