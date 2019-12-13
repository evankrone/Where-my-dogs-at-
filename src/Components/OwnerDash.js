import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './dash.css'

export class OwnerDash extends Component {
    render() {
        return (
            <>
                <div className='dash'>
                    <Link to="/walks"><button onClick={'rendering walks..'} type="button" className='topbtn'>View Your Walks</button></Link>
                    <Link to="/walk/new"><button onClick={'rendering map..'} type="button" className='leftbtn'> Create New Walk </button></Link>
                    <Link to="/"><button type="button" className='rightbtn'> Sign Out </button></Link>
                </div>
            </>
        )
    }
}

export default OwnerDash
