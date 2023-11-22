import { useState } from "react"
import { useParams } from "react-router-dom"
import BorderCountry from "./BorderCountry"

export default function InfoCountry() {
    const {search} = useParams()
    const [country, setCountry] = useState([])
    // console.log(search)
    fetch(`https://restcountries.com/v3.1/alpha/${search}`)
    .then(response => response.json())
    .then(data => setCountry(data))

    // if (country.length > 0) {
    //     console.log(country)
    //     throw  new Error('blockage')
    // }

    const borderCountry = (country) => {
        if (country.borders) {
            return(
                <div>
                    <h3>Pays frontaliers:</h3>
                    {country.borders.map((borderCountry) => 
                        <ul>
                            <li>
                                <BorderCountry borderCountry ={borderCountry} />    
                            </li>
                        </ul>
                    )}
                </div>
            )
        }
    }

    return(
        <div>
            {

                country.map((country) => (
                    <li>
                        <ul>
                            <li>nom : {country.name.common} </li>
                            <li>capitale : {country.capital[0]} </li>
                            <li>continent : {country.continents[0]} </li>
                            <li>langue officielle : {country.languages.eng} </li>
                            <li>population : {country.population} habitants </li>
                            {
                                borderCountry(country)
                            }

                        </ul>
                    </li>
                        )
                    )
                    
                    
            }
        </div>
    )
};
