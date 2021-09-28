import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Car extends Component {
    render() {
        return (
            <div className="car-div">
                { Object.entries(this.props).map(entry => <p>{`${entry[0]}: ${entry[1]}`}</p>) }
                <Link to={`/cars/${this.props.id}`}>
                    <button>Details</button>
                </Link>
                <button disabled="true">Buy</button>
            </div>
        )
    }
}
