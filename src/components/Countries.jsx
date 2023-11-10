import { render } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Countries() {
    const [countries, setCountries] = useState([])

    useEffect(() =>{
        fetch(`https://restcountries.com/v3.1/all`)
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleClick = (e) =>{
        e.preventDefault()
        const search =  e.target.id
        navigate(`info/${search}`)
    }
        
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
                                    // console.log(country.cca2),
                                    <li><a href="/" onClick={handleClick} id={country.cca2}> {country.name.common}</a> </li>
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
