import React, { Component } from 'react'
import './WalkCard.css'

export class WalkCard extends Component {

    state = {
        walkers: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/walkers')
        .then(resp => resp.json())
        .then(walkers => 
           this.setState({
             walkers: walkers  
           }) 
            )
        }


    matchWalker(walker){
        if(walker.id === this.props.walker_id){
            console.log(walker.id)
            console.log(this.props.walker_id)
            console.log(this.props.owner_id)
            console.log(this.props.currentUser.id)
            return (
                <div className='cardcontainer'>
                    <h2 className='cardtitle'>You have 1 pending walk with: </h2>
                    <div className='card'>
                        <img className='cardimg' src={walker.imgUrl}></img>
                        <h3 className='cardname'>{walker.name}</h3>
                        <h3 className='cardphone'>{walker.phone}</h3>
                        <h3 className={'cardrating'}>{walker.rating}</h3>
                    </div>
                    
                </div>
               )
            }else{
                 console.log('nope')
            } 
        }
        

    createCard = () => {
    return this.state.walkers.map( walker => this.matchWalker(walker))
    }
    
    
    
    render() {
        const getWalks = this.props.currentUser && this.props.currentUser.id === this.props.owner_id? this.createCard() : null
        return (
            <div>
                {getWalks}
            </div>
        )
    }
}

export default WalkCard

