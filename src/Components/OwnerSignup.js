import React, { Component } from 'react'
import './signup.css'

export class OwnerSignup extends Component {
    state = {
        name: "",
        dogname: "",
        email: "",
        address: "",
        city: "",
        addressstate: "",
        zipcode: "",
        password: "",
        passwordConfirmation: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.password === this.state.passwordConfirmation){
            fetch('http://localhost:3000/ownersignup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.name,
                    dogname: this.state.dogname,
                    email: this.state.email,
                    address: this.state.address,
                    city: this.state.city,
                    addressstate: this.state.addressstate,
                    zipcode: this.state.email,
                    password: this.state.passwordConfirmation,
                    
                })
            })
            .then( res => res.json())
            .then( response => {
                if (response.errors){
                    alert(response.errors)
                } else {
                    this.props.setUser(response.owner)
                    localStorage.token = response.token //in app.js we need to make a method that sets the current user and redirects to the approriate route i.e ownersdashboard or walkersdashboard
                    this.props.history.push(`/owner/${this.props.currentUser.id}`)
                }
               

            })
        } else {
        alert('Password Confirmation does not match Password.')
      }
    }
  
   
    render() {
       
        return (
            <div className='signup'>
                <form className="authform" onSubmit={this.handleSubmit}>
                    <input className="signinput" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/><br/>
                    <input className="signinput" name="dogname" value={this.state.dogname} onChange={this.handleChange} placeholder = "Your Dog's Name"/><br/>
                    <input className="signinput" name="email" value={this.state.email} onChange={this.handleChange}placeholder = "Email"/><br/>
                    {/* <input className="signinput" name="address" value={this.state.address} onChange={this.handleChange}placeholder = "Address"/><br/>
                    <input className="signinput" name="city" value={this.state.city} onChange={this.handleChange}placeholder = "City"/><br/>
                    <input className="signinput" name="addressstate" value={this.state.addressstate} onChange={this.handleChange}placeholder = "State"/><br/>
                    <input className="signinput" name="zipcode" value={this.state.zipcode} onChange={this.handleChange}placeholder = "Zipcode"/><br/> */}
                    <input className="signinput" name="password" value={this.state.password} onChange={this.handleChange} placeholder = "Password" type="password"/><br/>
                    <input className="signinput" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Password Confirmation" type="password"/><br/>
                    <button className='subbtn' type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default OwnerSignup;
