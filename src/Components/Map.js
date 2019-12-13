import React from "react";
import { Link } from 'react-router-dom';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  withScriptjs,
  Marker
} from "react-google-maps";
import './Map.css';
import hydrant from './hydrant.png'

const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    } 
  ]


class MapWithMarkers extends React.Component {
  constructor(){
    super()
    this.addMarker = this.addMarker.bind(this)
    this.state = {
    places: [],
    directions: [],
    owner_id: "",
    walker_id: null,
    completed: false,
    i: 3 
    };
  }

  addMarker(e) {
    if(this.state.places.length < 3){
      console.log(e.qa);
      console.log(this.props.currentUser.id)
      const newPlace = {
        id: this.state.places.length,
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      this.setState({
        places: [...this.state.places, newPlace],
        i: this.state.i -1 
      }); 
    }
  }

  componentDidUpdate() {
    if(this.state.places.length === 3) { 
      const directionsService = new window.google.maps.DirectionsService();
      const origin = { lat: this.state.places[0].lat, lng: this.state.places[0].lng }
      const destination = { lat: this.state.places[0].lat, lng: this.state.places[0].lng}
      const waypoints= [{ location: `${this.state.places[1].lat}, ${this.state.places[1].lng}`, stopover: true },{ location: `${this.state.places[2].lat}, ${this.state.places[2].lng}`, stopover: true}]
    
      directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: false,
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            owner_id: this.props.currentUser.id
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
      );
    }
  }

  createWalk = (e)  => {
    console.log('creating route')
    fetch('http://localhost:3000/walks', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({
        owner_id: this.state.owner_id,
        walker_id: this.state.walker_id,
        completed: this.state.completed
      })
      });
  }

  render() {
    return (
      <div>
        <GoogleMap
          className='googlemap'
          onClick={this.addMarker.bind(this)}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
          defaultOptions={{styles:mapStyle}}
        >  
          {this.state.places.map(place => {
            return (
              <>
                <Marker
                  className='marker'
                  key={place.id}
                  position={{ lat: place.lat, lng: place.lng }}
                  icon={hydrant}
                  size={new window.google.maps.Size(71, 71)}
                />
                <DirectionsRenderer
                  directions={this.state.directions}
                />
              </>   
            );
          })}
          <div className='overlay'>
            <h1 className='counter'> Choose {this.state.i} marker(s)</h1>
            <Link to='/walkers'><button className='button' onClick={this.createWalk}>Create Route</button></Link>
          </div>
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(MapWithMarkers));

