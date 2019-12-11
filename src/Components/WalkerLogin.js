import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class WalkerLogin extends Component {
    render() {
        return (
            <div>
            <div className='login'>
                <form className='auth-form' onSubmit={this.handleSubmit}>
                <input className='email' placeholder = "Email"/>
                <input className='password' placeholder = "Password" type="password"/>
                
                
               <button type='submit' className='lbutton'>Login</button>
                <Link to='/walker/new'><button className='rbutton'>Sign Up </button></Link>
                </form>
            </div>
        </div>
        )
    }
}

export default WalkerLogin
