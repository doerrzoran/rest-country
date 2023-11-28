
import './App.css';
import Countries from './components/Countries';
import React, { useEffect, useState } from 'react';
import SearcheCountries from './components/SearcheCountries';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SearchedCountrys from './components/SearchedCountrys';
import InfoCountry from './components/InfoCountry';
import Navbar from './components/Navbar';


function App() {
  const [countries, setCountries] = useState([])

  useEffect(() =>{
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(err => console.log(err))
  }, [])

  document.body.classList.add("bg-light")
  return (
    <div>
      <Countries countriesList ={countries} />
    </div>
  );
}

export default App;
