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
    const [link, setlink] = useState('')
    const [borderCountries, setborderCountries] = useState([])
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
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        setlink(e.target.id)
        setlinkValue(true)
    }

    if (linkValue) {
        navigate(`/detail/${link}`)
    }
    
    return(
        <div>
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
