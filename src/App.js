import {React,useState,useEffect} from 'react';
import axios from 'axios';
/**
 *  20210105 cbkim
 *  routing 추가
 */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import {Container} from '@material-ui/core';
/**
 * 20210105 cbkim
 * bootstrap
 */
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Navbar, Nav } from 'react-bootstrap';
import { Redirect, withRouter, useHistory } from "react-router-dom";

/** web scraping */
import Order from './page/order';


function App() {
  let history = useHistory();
  
  return (
    <Router>
      <Container fluid>
        
        <Switch>
          
          <Route exact path="/" component={Order}/>
          {/* <Route path="/test" component={RunTest}/>
          <Route path="/login" component={Login} />
          <Route path="/port" component={Port} /> */}
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
