import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './componets/Home';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Home />
    </div>
    </BrowserRouter>
  );
}

export default App;
