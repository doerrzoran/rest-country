import { useState } from "react"
import { useParams } from "react-router-dom"

export default function InfoCountry() {
    const {search} = useParams()
    const [country, setCountry] = useState([])
    // console.log(search)
    fetch(`https://restcountries.com/v3.1/alpha/${search}`)
    .then(response => response.json())
    .then(data => setCountry(data))
    
    // console.log(country[0].name.common)

    return(
        <div>
            <ul>
                {

                    country.map((country) => (
                            <li> {country.name.common} </li>
                            )
                        )
                    
                    
                }
            </ul>
        </div>
    )
};
