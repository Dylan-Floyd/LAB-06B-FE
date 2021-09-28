import React, { Component } from 'react';
import Car from './Car.js';

export default class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: []
        }
    }

    componentDidMount = () => {
        fetch('https://dylan-f2-06a.herokuapp.com/cars')
            .then(response => response.json())
            .then(json => this.setState({ cars: json }))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="App">
                Worlds Worst Car Buying App:
                <div className="car-list-div">
                    { this.state.cars.map(car => <Car {...car} />) }
                </div>
            </div>
        )
    }
}
