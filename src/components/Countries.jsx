import { render } from "@testing-library/react"
import { useEffect, useState } from "react"

export default function Countries() {
    const [countries, setCountries] = useState([])
    useEffect(() =>{
        fetch(`https://restcountries.com/v3.1/all`)
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <ul>
                {countries.map((list, index)=> (
                    // console.log(list.name.common)
                <li key={index}> {list.name.common} </li>
                ))}
            </ul>
        </div>
    )
};
