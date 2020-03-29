import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './_pages/LoginPage';
import {MyLayout} from './_pages/Layout';
import './css/layout.css';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div> 
      <BrowserRouter>
        <MyLayout/>
        
      </BrowserRouter>     
     
    </div>
  );
}

export default App;
