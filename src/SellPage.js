import React, { Component } from 'react'
import CarForm from './CarForm.js'
import { postCar } from './fetch-utils.js'

export default class SellPage extends Component {

    handleSubmit = async (carData) => {
        await postCar(carData);
        this.props.history.push('/cars');
    }

    render() {
        return (
            <>
                List your car with us and get up to tens of <s>thousands</s> views.
                <CarForm handleSubmit={this.handleSubmit}/>
            </>
        )
    }
}
