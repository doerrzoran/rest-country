import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function InputsCountry(props) {
    let {countriesList} = props
    const [countries, setCountries] = useState([])
    const [continent, setcontinent] = useState('')
    const [name, setname] = useState('')
    const [inputValue, setinputValue] = useState(false)

    useEffect(()=>{
        setCountries(countriesList)
    }, [countriesList])
    

    let continents = []
    countriesList.map((country) => {
        continents.push(country.continents[0])
        continents = continents.filter((value, index) => continents.indexOf(value) === index)
    })
    
    const handleChange = (e) => {
        setname(e.target.value)
    }
    
    const navigate = useNavigate()
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            navigate(`country/${name}`)
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
    const handleChangeValue = (e) =>{
        setcontinent(e.target.value)
    }
    const handleSelect = (e) => {
        navigate(`continent/${continent}`)
    }

    
    return(
        <div className="container mt-5">

                    <div className="flex-row row justify-content-between">
                        <div className="col-md-3 flexcol">
                            <input id='searchInput' onChange={handleChange} onKeyDown={handleKeyDown} type="text" className="form-control form-input " placeholder="Search anything..." />

                        </div>

                    
                    
                        <div className="col-xs-4 w-25">
                            <select id="selectInput" onChange={handleChangeValue} class="form-select" aria-label="Default select example">
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
    )
};
