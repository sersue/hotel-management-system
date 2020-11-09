import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import Mypage from './components/pages/Mypage';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/reservation' component={Reservation} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
