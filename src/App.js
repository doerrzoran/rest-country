
import './App.css';
import Countries from './components/Countries';
import React from 'react';
import SearcheCountries from './components/SearcheCountries';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SearchedCountrys from './components/SearchedCountrys';
import InfoCountry from './components/InfoCountry';


function App() {
  return (
    <BrowserRouter>
      <div classname="app">

        <SearcheCountries/>
        <div className='content'>

        <Routes>
          <Route path='/' element = {<Countries/>}></Route>
          <Route path='/result'>
            <Route path=":search" element = {<SearchedCountrys/>}></Route>
          </Route>
          <Route path='/info'>
            <Route path=":search" element = {<InfoCountry/>}></Route>
          </Route>
        </Routes>
        </div>
      </div>  
    </BrowserRouter>
  );
}

export default App;
