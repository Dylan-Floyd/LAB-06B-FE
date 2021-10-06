import React, { Component } from 'react'
import { getCategories } from './fetch-utils.js';

export default class CarForm extends Component {

    constructor(props) {
        super(props);

        const {
            make,
            model,
            yearReleased: releaseYear,
            stillProduced,
            energyType,
            category_id
        } = props;

        this.state = {
            categories: [],
            make: make || '',
            model: model || '',
            releaseYear: releaseYear || 1900,
            stillProduced: stillProduced || false,
            energyType: energyType || "gas",
            category_id: category_id || 1
        }
    }
    
    componentDidMount = async () => {
        const categories =  await getCategories();

        this.setState({ categories: categories })
    }

    handleSubmit = async e => {
        e.preventDefault();

        let carData = Object.assign({}, this.state);
        delete carData.categories;

        this.props.handleSubmit(carData);
    }

    handleInputChange = (e) => {
        //this turned out jankier than I thought it would be.
        let value = e.target.value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        } else if (e.target.tagName.toLowerCase() === "select" || e.target.type === "number") {
            value = Number(e.target.value);
        }

        this.setState({ [e.target.name]: value });
    }

    render() {
        const {
            make,
            model,
            releaseYear,
            stillProduced,
            energyType,
            category_id
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="sell-form">
                    <label for="make">
                        Make: 
                        <input type="text" name="make" value={make} onChange={this.handleInputChange} />
                    </label>
                    
                    <label for="model">
                        Model: 
                        <input type="text" name="model" value={model} onChange={this.handleInputChange} />
                    </label>
                    
                    <label for="yearReleased">
                        Year Released: 
                        <input type="number" name="yearReleased" value={releaseYear} onChange={this.handleInputChange} />
                    </label>
                    
                    <label for="stillProduced">
                        Still Produced: 
                        <input type="checkbox" name="stillProduced" value={stillProduced} onChange={this.handleInputChange} />
                    </label>
                    
                    <label for="energyType">
                        Energy Type: 
                        <input type="text" name="energyType" value={energyType} onChange={this.handleInputChange} />
                    </label>
                    
                    <label for="category_id">
                        Category:
                        <select name="category_id" value={category_id} onChange={this.handleInputChange}>
                            {this.state.categories.map(category => <option value={category.id}>{category.name}</option>)}
                        </select>
                    </label>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}
