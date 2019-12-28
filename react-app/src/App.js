import React from 'react';
import './App.css';
import Welcome from './Components/Welcome.js';
import Clock from './Components/Clock/Clock.js';
import LoginControl from './Components/LoginControl/LoginControl';
import NumberList from './Components/NumberList/NumberList';

function App() {
  return (
    <div className="App">
      <Welcome name="Taylor"/>
      <LoginControl />
      <Clock backgroundColor="green" />
      <Clock backgroundColor="blue" />
      <NumberList numbers={[1,2,3,4,5]} />
    </div>
  );
}

export default App;
