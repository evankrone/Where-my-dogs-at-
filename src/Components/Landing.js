import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css';

export class Landing extends Component {
    render() {
        return (
            <div>
                <Link to="/ownerlogin"><button className='leftbutton' type="button"> Continue as a Dog Owner</button></Link>
                <Link to="/walkerlogin"><button className='rightbutton' type="button"> Continue as a Dog Walker</button></Link>
            </div>
        )
    }
}

export default Landing
