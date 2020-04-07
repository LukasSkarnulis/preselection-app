import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Dancers from "../Dancers/Dancers";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ErrorBoundary>
      <Dancers />
      </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
