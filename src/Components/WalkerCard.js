import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './WalkerCard.css'


export class WalkerCard extends Component {
    state = {
        walkId: ''
    }
componentDidMount(){
    fetch('http://localhost:3000/walks')
    .then(resp => resp.json())
    .then( walks => {
     this.setState({
         walkId: walks[walks.length-1].id
     })
    
    }
        
    )}

handleClick(props){
        console.log('selected')
        console.log(this.props)

        fetch(`http://localhost:3000/walks/${this.state.walkId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    walker_id: this.props.id,
                })
              });
             
    }

    render(props) {
    return (
    <div  className='cardcontainer'>
        <Link to='/walks' style={{textDecoration: 'none'}}><div onClick={() => {this.handleClick(props)}} className='figure'>
            <img src={`${this.props.imgUrl}`} alt="No Image" className='image'/>
            <h1 className='h1'>{this.props.name}</h1>
            <h2 className='h2'>{this.props.rate}</h2>
            <h4 className='h4'>{this.props.rating}</h4>
        </div></Link>
    </div>
    );

    } 
};

export default WalkerCard
