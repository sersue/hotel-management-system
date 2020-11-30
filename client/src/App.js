import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import Mypage from './components/pages/Mypage';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Confirmation from './components/pages/Confirmation';
import description from './components/pages/description'



function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const logout = () => setUser(null);
  const { email, password, name } = user || {};
  console.log(user);
  const userfull ={email, password, name};
  console.log(userfull.email)

  return (

      <Router>
      <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/reservation' component={Reservation} />
          <Route path='/confirmation' component={Confirmation} />
          <Route path='/description' component={description} />
          <Route
            path="/login"
            render={props => (
              <LogIn/>
            )}
          />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
  );
}

export default App;
