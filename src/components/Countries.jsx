import { render } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ContinentsFilter from "./ContinentsFilter"
import Navbar from "./Navbar"
import BorderCountry from "./BorderCountry"

export default function Countries(props) {
    let {countriesList} = props
    const [countries, setCountries] = useState([])
    const [name, setname] = useState('')
    const [link, setlink] = useState('')
    const [continent, setcontinent] = useState('')
    const [selected, setSelected] = useState()
    const [borderCountries, setborderCountries] = useState([])
    const [inputValue, setinputValue] = useState(false)
    const [selectValue, setselectValue] = useState(false)
    const [linkValue, setlinkValue] = useState(false)
    const [isBorder, setisBorder] = useState(false)

    
    useEffect(()=>{
        setCountries(countriesList)
        setborderCountries([])
    }, [countriesList])
    

    let continents = []
    countriesList.map((country) => {
        // console.log(country.continents[0])
        continents.push(country.continents[0])
        continents = continents.filter((value, index) => continents.indexOf(value) === index)
    })
    
// LINKS
    const handleClick = (e) => {
        e.preventDefault()
        setCountries(countriesList)
        setlink(e.target.id)
        setborderCountries([])
        setlinkValue(true)

        console.log(countries)
    }

    if(linkValue){
        let countryfilter = countries.filter((country) => {
            return country.name.common === link
        })
        setCountries(countryfilter)
        setisBorder(true)
        setlinkValue(false)
    }
    
    if (isBorder && countries[0].borders) {
        let border = countriesList.filter((country) => 
            !!country.borders && country.borders.includes(countries[0].cca3)
        )
        setborderCountries(border)
        setisBorder(false)
    }



// INPUT

    const handleChange = (e) => {
        setname(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setborderCountries([])
        setCountries(countriesList)
        let countriesFilter = countries
        setinputValue(true)
    }
    
    if(inputValue){
        
        setinputValue(false)
        let countriesFilter = countries.filter((country) => {
            return country.name.common.toLowerCase().startsWith(name)
        }) 
        setCountries(countriesFilter)

    }
    
    
//SELECT

    const handleSelect = (e) => {
        setcontinent(e.target.value)
        setCountries(countriesList)
        setborderCountries([])
        setselectValue(true)
    }

    if(selectValue){
        let continentFilter = countries.filter((country) => {
            return country.continents.includes(continent)
        })
        setCountries(continentFilter)
        setselectValue(false)
    }


    return[
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleChange}/>
                <button type="submit">chercher</button>
            </form>


            <form>
                <select value={selected}>
                    <option value="">Filtrer par continents</option>
                    {
                        continents.map((continent) => 
                            <option value={continent} onClick={handleSelect}>{continent}</option>
                        )
                    }
                </select>
            </form>

            
            <ul>
                {
                    countries.map((country) => 
                    <li>
                        <a href="/" onClick={handleClick} id={country.name.common}> {country.name.common}</a>
                        <ul>
                            {
                                borderCountries.map((borderCountry) => 
                                    <li>
                                        <a href="/" onClick={handleClick} id={borderCountry.name.common}>
                                            {borderCountry.name.common}
                                        </a>
                                    </li>
                                )
                            }
                        </ul> 
                    </li>
                    )
                    
                }
            </ul>
        </div>
        
    ]
    
};
