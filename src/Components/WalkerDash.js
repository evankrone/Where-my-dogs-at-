import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class WalkerDash extends Component {
    render() {
        return (
            <div>
                <Link to="/walker/:id/walks"><button type="button"> View Your Walks </button></Link>
                <Link to="/"><button type="button"> Sign Out </button></Link>
                
            </div>
        )
    }
}

export default WalkerDash
