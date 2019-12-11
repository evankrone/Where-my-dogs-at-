import React, { Component } from 'react'

export class WalkerSignup extends Component {
    state = {
        imgUrl: "",
        name: "",
        email: "",
        phone: "",
        description: "",
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
            fetch('http://localhost:3000/walkersignup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    imgUrl: this.state.imgUrl,
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    description: this.state.description,
                    zipcode: this.state.email,
                    password: this.state.passwordConfirmation,
                    
                })
            })
            .then( res => res.json())
            .then( response => {
                if (response.errors){
                    alert(response.errors)
                } else {
                    this.props.setWalker(response.walker)
                    localStorage.token = response.token //in app.js we need to make a method that sets the current user and redirects to the approriate route i.e ownersdashboard or walkersdashboard
                    this.props.history.push(`/walker/${this.props.currentUser.id}`)
                }
               

            })
        } else {
        alert('Incorrect Password.')
      }
    }               
  
   
    render() {
       
        return (
            <div className='signup'>
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <input type="imgUrl" src={this.state.imgUrl} onChange={this.handleChange} placeholder="Image Url" alt="Submit"/><br/>
                    <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/><br/>
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder = "Email"/><br/>
                    <input name="phone" value={this.state.phone} onChange={this.handleChange} placeholder = "Phone Number"/><br/>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder = "About me..." /><br/>
                    <input name="password" value={this.state.password} onChange={this.handleChange} placeholder = "Password" type="password"/><br/>
                    <input name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Password Confirmation" type="password"/><br/>
                    <button className='btn' type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default WalkerSignup;
