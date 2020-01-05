import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import TopicTeaser from './Components/Topic/TopicTeaser';
import RouteService from './Services/RouteService';

// Bootstrap Imports
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <NavBar brand="Prompt Story"></NavBar>
        <div id="app-main-container">
          <Route exact={true} path="/">
            <div className="App" id="homePage">
              <TopicTeaser topicName="History" />
              <TopicTeaser topicName="Science" />
              <TopicTeaser topicName="English" />
            </div>
          </Route>
          <RouteService />
        </div>
      </Router>
  );
}

export default App;
