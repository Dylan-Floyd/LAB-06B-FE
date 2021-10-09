import React, { Component } from 'react'
import Car from '../components/Car.js';
import { getCarById } from '../fetch-utils.js';

export default class CarDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            carData: {}
        }
    }

    componentDidMount = async () => {
        this.setState({loaded: false});
        const carData = await getCarById(this.props.match.params.id);
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
                Loading...
            </div>
        )
    }
}
