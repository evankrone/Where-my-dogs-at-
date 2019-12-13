import React, { Component } from 'react'
import Map from "./Components/Map";
import Landing from './Components/Landing';
import OwnerSignup from './Components/OwnerSignup';
import OwnerLogin from './Components/OwnerLogin';
import WalkerSignup from './Components/WalkerSignup';
import WalkerLogin from './Components/WalkerLogin';
import OwnerDash from './Components/OwnerDash';
import WalkerDash from './Components/WalkerDash';
import WalkerList from './Components/WalkerList';
import video from './dogps.mp4';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import YourWalks from './Components/YourWalks';

export class App extends Component {

  state = {
    currentUser: null
  }

  componentDidMount(){
    if (localStorage.token) {
      fetch('http://localhost:3000/auto_login', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.token
        },
      })
      .then(res => res.json())
      .then(response => {
        // console.log(response.owner.id)
        this.setState({
          currentUser: response.owner
        }) 
      })
    }
  }

  setUser = (owner) => {
    console.log('setting user ', owner)
    this.setState({
      currentUser: owner
    })
  }

  setWalker = (walker) => {
    console.log('setting user ', walker)
    this.setState({
      currentUser: walker
    })
  }

  renderVid = () =>{
    return (
    <div className='section'>
      <h1 className='logo'>WHERE MY DOGS AT?</h1>
        <div className='video-container'>
          <video id="background-video" loop autoPlay muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
    </div>
    )
  }

  render() {
    const vid =  window.location.pathname !== '/walk/new' && window.location.pathname !== '/walks' && window.location.pathname !== '/walkers' ? this.renderVid() : null
  return (
    <div> 
      {vid}
      <BrowserRouter>
        <Switch>
          <Route path="/ownerlogin" render={(routerProps) => <OwnerLogin setUser={this.setUser} currentUser={this.state.currentUser}{...routerProps}/>} />
          <Route path="/ownersignup" render={(routerProps) => <OwnerSignup setUser={this.setUser} currentUser={this.state.currentUser} {...routerProps}/>} />
          <Route path="/walkerlogin" render={(routerProps) => <WalkerLogin {...routerProps}/>} />
          <Route path="/walker/new" render={(routerProps) => <WalkerSignup setWalker={this.setWalker} currentUser={this.state.currentUser} {...routerProps}/>} />
          <Route path="/owner" render={(routerProps) => <OwnerDash vid={this.vid} {...routerProps}/>} />
          <Route path="/walker/" render={(routerProps) => <WalkerDash {...routerProps}/>} />
          <Route path="/walks" render={(routerProps) => <YourWalks currentUser={this.state.currentUser} {...routerProps}/>}/>
          <Route path="/walkers" render={(routerProps) => <WalkerList {...routerProps}/>} />
          <Route exact path="/" render={(routerProps) => <Landing {...routerProps}/>} />
          <Route exact path = '/walk/new'render={(routerProps) => 
            <Map 
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2-63He_6tvDTzz1TL5r6vGiw0jOqRYUU"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `865px` }} />}
              mapElement={<div style={{ height: `100%`}} />}
              center={{ lat: 40.783058, lng: -73.971252 }}
              zoom={15}
              setUser={this.setUser} 
              currentUser={this.state.currentUser}
            />}
          />
        </Switch>
      </BrowserRouter> 
    </div>
  );
  };
}

export default App;