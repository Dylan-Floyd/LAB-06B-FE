import React, { Component } from 'react';
import Car from '../components/Car.js';
import CategorySelect from '../components/CategorySelect.js';
import { getCars } from '../fetch-utils.js';

export default class CarsPage extends Component {

    state = {
        cars: [],
        category_id: -1
    }

    componentDidMount = async () => {
        let cars = await getCars();
        this.setState({cars: cars});
    }

    handleSelectChange = (e) => {
        this.setState({ category_id: Number(e.target.value) });
    }

    render() {
        const { category_id } = this.state;
        const filteredCars = this.state.cars.filter(car => category_id < 0 || car.category_id === category_id);
        return (
            <div className="App">
                <CategorySelect handleChange={this.handleSelectChange} showAny={true} category_id={this.state.category_id}/>
                <div className="car-list-div">
                    { filteredCars.map(car => <Car inList={true} {...car} key={car.id}/>) }
                </div>
            </div>
        )
    }
}
