import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import TopicMain from './Components/Topic/TopicMain';
import CollectionRouteService from './Services/CollectionRouteService';
import SpotifyCallback from './Components/SpotifyPlayback/SpotifyCallback.js';
import mainBackground from './Assets/graybackground.jpg';

// Bootstrap Imports
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router basename="study_noise">
        <NavBar brand="Study Noise"></NavBar>
        <div id="app-main-container" style={{backgroundImage: `url(${mainBackground})`}}>
          <Route exact={true} path="/" component={TopicMain} />
          <CollectionRouteService />
          <Route path="/spotify/callback" render={({ location }) =>
            <div className="App" id="homePage">
              <SpotifyCallback location={location} />
            </div>
          } />
        </div>
      </Router>
  );
}

export default App;
