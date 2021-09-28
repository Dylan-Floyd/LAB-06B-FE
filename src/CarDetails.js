import React, { Component } from 'react'
import Car from './Car.js';

export default class CarDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            carData: {}
        }
    }

    componentDidMount = () => {
        fetch('https://dylan-f2-06a.herokuapp.com/cars/'+this.props.match.params.id)
            .then(response => response.json())
            .then(json => this.setState({
                carData: json,
                loaded: true
            }))
            .catch(e => console.log(e));
    }

    render() {
        if (this.state.loaded) {
            return (
                <Car {...this.state.carData} />
            )
        }
        //not loaded:
        return (
            <div>
                hmm this terrible car buying app isn't working, my condolences.
            </div>
        )
    }
}
