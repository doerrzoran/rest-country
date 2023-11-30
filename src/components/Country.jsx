import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Country(props) {
    let {countriesList} = props
    let {detail} = useParams()
    const [countryName, setCountryName] = useState(detail)
    const [countries, setCountries] = useState([])
    const [borderCountries, setborderCountries] = useState([])
    const [link, setlink] = useState('')
    const [linkValue, setlinkValue] = useState(false)

    let countryfilter = countriesList.filter((country) => {
        return country.name.common === countryName
    })

    useEffect(() => {
        setCountries(countryfilter);
    }, [countryfilter]);
    
    useEffect(() => {
        if (countries.length > 0) {
          // Place logics that depend on countries here
          let border = countriesList.filter((country) => 
            !!country.borders && country.borders.includes(countries[0].cca3)
          );
          setborderCountries(border);
        }
      }, [countries, countriesList]);
      


    
    const handleClick = (e) => {
        e.preventDefault()
        setlink(e.target.id)
        setlinkValue(true)
    }

    if (linkValue) {
        setCountryName(link)
        setlinkValue(false)
    }
    
    return(
        
        countries.map((country) => 

        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <img src={country.flags.png} alt="Country Flag" class="img-fluid"/>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div id="titleCountry" className="col-md-12">
                            <h2>{country.name.common}</h2>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0].official}</li>
                                <li><strong>Population:</strong> {country.population}</li>
                                <li><strong>Region:</strong> {country.region}</li>
                                <li><strong>Sub Region:</strong> {country.subregion}</li>
                                <li><strong>Capital:</strong> {country.capital[0]}</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Top Level Domain:</strong> {country.tld}</li>
                                <li><strong>Currencies:</strong> {Object.values(country.currencies)[0].name}</li>
                                <li><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</li>
                            </ul>
                        </div>
                    </div>
                    <div id="bordercountries" className="row d-flex justify-content-between">
                        <div className="d-flex">
                        <span><strong> Border countries:</strong></span>
                            {borderCountries.map((borderCountry) => (
                            <a
                                key={borderCountry.name.common}
                                href="/"
                                onClick={handleClick}
                                id={borderCountry.name.common}
                                className="mx-2"
                            >
                                {borderCountry.name.common}
                            </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        )
        
                
    )  
    
};
