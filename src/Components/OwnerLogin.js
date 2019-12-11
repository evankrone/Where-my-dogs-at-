import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'


class OwnerLogin extends React.Component{
    state = {
        email: "",
        password: ""
      }
    
      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
    
        fetch(`http://localhost:3000/ownerlogin`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
        console.log(response)
          if (response.errors){
            alert(response.errors)
          } else {
            this.props.setUser(response.owner)
            localStorage.token = response.token
      
            this.props.history.push(`/owner/${this.props.currentUser.id}`)
          }
        })
      }
    
    render(){
    return (
        <div>
          
            <div className='login'>
                <form className='auth-form' onSubmit={this.handleSubmit}>
                <input name='email' className='email' value={this.state.email} onChange={this.handleChange}placeholder = "Email"/>
                <input name='password' className='password' value={this.state.password} onChange={this.handleChange}placeholder = "Password" type="password"/>
                
                
               <button type='submit' className='lbutton'>Login</button>
                <Link to='/ownersignup'><button className='rbutton'>Sign Up </button></Link>
                </form>
            </div>
        </div>
    );
    }
}
export default OwnerLogin;