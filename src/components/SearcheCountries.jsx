import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function SearcheCountries(props) {
    let {countriesList} = props
    const {name} = useParams()
    const [countries, setCountries] = useState([])
    const [link, setlink] = useState('')

    let countryfilter = countriesList.filter((country) => {
        return country.name.common.toLowerCase().startsWith(name)
    })

    useEffect(() => {
        setCountries(countryfilter);
        // console.log('Updated countries:', countryfilter);
    }, [countryfilter]);


    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        setlink(e.target.id)
        navigate(`/${link}`)
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
