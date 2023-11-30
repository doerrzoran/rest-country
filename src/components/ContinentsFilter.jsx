import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ContinentsFilter(props) {
    let {countriesList} = props
    const {continent} = useParams()
    const [countries, setCountries] = useState([])
    const [link, setlink] = useState('')
    const [linkValue, setlinkValue] = useState(false)

    let continentFilter = countriesList.filter((country) => {
        return country.continents.includes(continent)
    })

    useEffect(() => {
        setCountries(continentFilter)
    }, [continentFilter])
    
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        setlink(e.target.id)
        setlinkValue(true)
    }

    if (linkValue) {
        navigate(`../../detail/${link}`)
    }
    return(
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
                            </div>
                            )
                            
                        }
                    </div>
                </div>
    )
};

