import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import TopicMain from './Components/Topic/TopicMain';
import RouteService from './Services/RouteService';

// Bootstrap Imports
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <NavBar brand="Study Noise"></NavBar>
        <div id="app-main-container">
          <Route exact={true} path="/">
            <div className="App" id="homePage">
              <TopicMain />
            </div>
          </Route>
          <RouteService />
        </div>
      </Router>
  );
}

export default App;
