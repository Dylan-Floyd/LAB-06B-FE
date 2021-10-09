import React, { Component } from 'react'
import CarForm from '../components/CarForm.js'
import { postCar } from '../fetch-utils.js'

export default class SellPage extends Component {

    handleSubmit = async (carData) => {
        await postCar(carData);
        this.props.history.push('/cars');
    }

    render() {
        return (
            <>
                <CarForm handleSubmit={this.handleSubmit}/>
            </>
        )
    }
}
