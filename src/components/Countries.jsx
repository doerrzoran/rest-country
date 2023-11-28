import { render } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ContinentsFilter from "./ContinentsFilter"
import Navbar from "./Navbar"
import BorderCountry from "./BorderCountry"
import Country from "./Country"
import { Search } from "react-bootstrap-icons"

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
        continents.push(country.continents[0])
        continents = continents.filter((value, index) => continents.indexOf(value) === index)
    })
    
// LINKS
    const handleClick = (e) => {
        e.preventDefault()
        setCountries(countriesList)
        console.log(e.target.id)
        setlink(e.target.id)
        setborderCountries([])
        setlinkValue(true)
    }

    if(linkValue){
        let countryfilter = countries.filter((country) => {
            return country.name.common === link
        })
        setCountries(countryfilter)
        setisBorder(true)
        setlinkValue(false)
        console.log(countryfilter)
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
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setborderCountries([])
            setCountries(countriesList)
            let countriesFilter = countries
            setinputValue(true)
        }
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

    // console.log(countries)
    // throw new Error('stop')

    return(
        <div>
            
                <Navbar/>

            <form>
                <div className="container mt-5">

                    <div className="flex-row row justify-content-between">
                        <div className="col-md-3 flexcol">
                            <input id='searchInput' onChange={handleChange} onKeyDown={handleKeyDown} type="text" className="form-control form-input " placeholder="Search anything..." />

                        </div>

                    
                    
                        <div className="col-xs-4 w-25">
                            <select id="selectInput" value={selected} class="form-select" aria-label="Default select example">
                                <option selected>Filtrer par continents</option>
                                {
                                    continents.map((continent) => 
                                    <option value={continent} onClick={handleSelect}>{continent}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                </div>
            </form>


                <div className="container">
                    <div className="row">
                        {
                            countries.map((country) => 
                            <div className="col">
                                <div className="card" style={{ width: '18rem'}}>
                                    <img className="card-img-top" src={country.flags.png} alt="Card image cap" style={{ width: '18rem'}} />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <a href="/" onClick={handleClick} id={country.name.common}>
                                                {country.name.common}
                                            </a>
                                        </h5>
                                        <p className="card-text">Population: {country.population} </p>
                                        <p className="card-text">Region: {country.region} </p>
                                        <p className="card-text">Capitale: {country.capital} </p>
                                    </div>
                                </div>
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
                            </div>
                            )
                            
                        }
                    </div>
                </div>
        </div>
        
    )
    
};
