import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BorderCountry(props) {
    let {borderCountry} = props
    const [country, setcountry] = useState([])
    const [countryName, setcountryName] = useState('')
    
    useEffect(() =>{
        fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
        .then(response => response.json())
        .then(data => setcountry(data))
        .catch(err => console.log(err))
    }, [borderCountry])

    const navigate = useNavigate()
    const handleClick = (e) =>{
        e.preventDefault()
        const search =  e.target.id
        navigate(`../${search}`)
    }
    
    if(country.length > 0){
        
        return(
            <div onClick={handleClick} id={country[0].name.common}>{country[0].name.common}</div>
        )

    }

};
