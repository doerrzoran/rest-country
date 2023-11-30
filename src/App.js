
import './App.css';
import Countries from './components/Countries';
import React, { useEffect, useState } from 'react';
import SearcheCountries from './components/SearcheCountries';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import InputsCountry from './components/InputsCountry';
import ContinentsFilter from './components/ContinentsFilter';
import Country from './components/Country';


function App() {
  const [countries, setCountries] = useState([])
  const [isSwitchOn, setisSwitchOn] = useState(true)
  const [mode, setmode] = useState(isSwitchOn ? "background" : "dark")

  useEffect(() =>{
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(err => console.log(err))
    console.log(countries[2])
  }, [])

  const handleClick =() =>{
    if(isSwitchOn) {
      setmode("dark")
      setisSwitchOn(false)
    }else{
      setmode("background")
      setisSwitchOn(true)
    }
  }

  useEffect(() => {
    document.body.classList.add(mode);
    return () => {
      document.body.classList.remove("dark", "background");
    };
  }, [mode]);
  return (
    <div className='App'>
      <BrowserRouter>
        <nav class="navbar navbar-expand-lg navbar shadow-sm p-3 mb-5 rounded justify-content-between" >
            <h1><a href="/">Where in the world?</a></h1>
            <button onClick={handleClick} class="btn btn-outline-light ml-auto focus:outline-none">dark-mode</button>
        </nav>
          <InputsCountry countriesList ={countries}  />
        
          <Routes>
            <Route path='/' element={<Countries countriesList ={countries} />} />
            <Route path='/detail'>
              <Route path=':detail' element={<Country countriesList ={countries} />} />

            </Route>
          
            <Route path='/country'>
              <Route path=':name' element={<SearcheCountries countriesList ={countries} />} />
            </Route>
            <Route path='/continent'>
              <Route path=':continent' element={<ContinentsFilter countriesList ={countries} />} />
            </Route>
            
          </Routes>
        
        </BrowserRouter>
      </div>
      // <Countries countriesList ={countries} />
  );
}

export default App;
