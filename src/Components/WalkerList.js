import React, { Component } from 'react'
import WalkerCard from './WalkerCard'

export class WalkerList extends Component {
   
    state = {
        walkers: []
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/walkers')
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            walkers: data
          })
        })
      }

    render() {
        
        return (
            <>
            <h1 className='title'>Choose A Walker</h1>
            <div className="cardcontainer">
                {
                    this.state.walkers.map(walker => <WalkerCard key={walker.id}{...walker} />)
                }
            </div>
            </>
        )
    }
}

export default WalkerList;
