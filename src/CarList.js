import React, { Component } from 'react';
import Car from './Car.js';

export default class CarList extends Component {

    state = {
        cars: []
    }

    componentDidMount = () => {
        fetch('https://lab-06b-be-dylan.herokuapp.com/cars/')
            .then(response => response.json())
            .then(json => this.setState({ cars: json }))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="App">
                Here be our cars:
                <div className="car-list-div">
                    { this.state.cars.map(car => <Car inList={true} {...car} />) }
                </div>
            </div>
        )
    }
}
