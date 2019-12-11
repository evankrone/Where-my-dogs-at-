import React, { Component } from 'react'
import WalkCard from './WalkCard'
import { Link } from 'react-router-dom';

export class YourWalks extends Component {

    state = {
        walks: []
    }

componentDidMount(){
    fetch('http://localhost:3000/walks')
    .then(resp => resp.json())
    .then(walks => {
        this.setState({
            walks:walks
        })
    })
}


    render() {
        return (
            <div>
                <h1 className='walktitle'>Your Current Walks:</h1>
                {
                this.state.walks.map(walk => <WalkCard key={walk.id} currentUser={this.props.currentUser} {...walk}/>)
                }
                <Link to={`/owner/1`}><button className='backbtn'>Back to Dashboard</button></Link>
            </div>
        )
    }
}

export default YourWalks
