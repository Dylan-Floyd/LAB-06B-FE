import React, { Component } from 'react'
import Car from './Car.js';
import { getCarById } from './fetch-utils.js';

export default class CarDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            carData: {}
        }
    }

    componentDidMount = () => {
        this.setState({loaded: false});
        const carData = getCarById(this.props.match.params.id);
        this.setState({
            carData: carData,
            loaded: true
        })
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
