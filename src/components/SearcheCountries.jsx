import { render } from "@testing-library/react"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function SearcheCountries() {
    const[name, setName] = useState('')

    const handleChange=(e) => {
        setName(e.target.value)
    }

    const navigate = useNavigate()
    const handleSubmit =(e) =>{
        e.preventDefault()
        const search = name
        navigate(`result/${search}`)
        // console.log(search)
        
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={handleChange}/>
            <button type="submit">chercher</button>
        </form>
    )
    
};

export default SearcheCountries