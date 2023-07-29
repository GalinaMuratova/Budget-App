import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={(<Home />)}></Route>
        <Route path='/categories' element={(<Categories />)}></Route>
      </Routes>
    </>
  );
}

export default App;
