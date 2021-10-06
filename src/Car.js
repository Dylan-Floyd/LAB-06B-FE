import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CarForm from './CarForm.js'
import { deletecar, putCar } from './fetch-utils.js'

class Car extends Component {

    state = {
        editing: false
    }

    handleClick = () => {
        if (!this.props.inList) {
            //This car is being viewed at /cars/:id, handle the edit button being clicked
            this.setState(prevState => {
                return { editing: !prevState.editing }
            });
        } else {
            //This car is being viewed at /cars, handle the details button being clicked
            this.props.history.push('/cars/'+this.props.id);
        }
    }

    handleSubmit = async (carData) => {
        carData.id = this.props.id;
        await putCar(carData);
        this.props.history.push('/cars');
    }

    handleDelete = async () => {
        await deletecar(this.props.id);
        this.props.history.push('/cars');
    }

    render() {
        if (this.state.editing) {
            return (
                <CarForm {...this.props } handleSubmit={this.handleSubmit}/>
            )
        }
        return (
            <div className="car-div">
                <p>Make: {this.props.make}</p>
                <p>Model: {this.props.model}</p>
                <p>Release Year: {this.props.releaseYear}</p>
                <p>Still Being Produced: {this.props.stillProduced ? "yes" : "no"}</p>
                <p>Energy Type: {this.props.energyType}</p>
                <p>Category: {this.props.category}</p>
                <button onClick={this.handleClick}> {this.props.inList ? "Details" : "Edit"} </button>
                <button disabled={true}>Buy</button>
                {this.props.inList ? <></> : <button onClick={this.handleDelete}>Delete</button> }
            </div>
        )
    }
}

export default withRouter(Car);