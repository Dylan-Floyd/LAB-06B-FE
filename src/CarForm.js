import React, { Component } from 'react'
import CategorySelect from './CategorySelect.js';
import { getCategories, uploadImg } from './fetch-utils.js';

export default class CarForm extends Component {

    constructor(props) {
        super(props);

        const {
            make,
            model,
            releaseYear,
            stillProduced,
            energyType,
            category_id,
            img
        } = props;

        this.state = {
            categories: [],
            make: make || '',
            model: model || '',
            releaseYear: releaseYear || 1900,
            stillProduced: stillProduced || false,
            energyType: energyType || "gas",
            category_id: category_id || 1,
            img: img || ''
        }
    }
    
    componentDidMount = async () => {
        const categories = await getCategories();

        this.setState({ categories: categories })
    }

    handleSubmit = async e => {
        e.preventDefault();

        //create an object that only has the form data.
        let carData = Object.assign({}, this.state);
        delete carData.categories;
        delete carData.imageFile;

        //pass it up to the parent component.
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

    handleImageChange = async (e) => {
        const newUrl = await uploadImg(e.target.files[0]);
        this.setState({ img: newUrl });
    }

    render() {
        const {
            make,
            model,
            releaseYear,
            stillProduced,
            energyType,
            category_id,
            img
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="sell-form">
                    <label htmlFor="make">
                        Make: 
                        <input type="text" name="make" value={make} onChange={this.handleInputChange} />
                    </label>
                    
                    <label htmlFor="model">
                        Model: 
                        <input type="text" name="model" value={model} onChange={this.handleInputChange} />
                    </label>
                    
                    <label htmlFor="yearReleased">
                        Year Released: 
                        <input type="number" name="yearReleased" value={releaseYear} onChange={this.handleInputChange} />
                    </label>
                    
                    <label htmlFor="stillProduced">
                        Still Produced: 
                        <input type="checkbox" name="stillProduced" value={stillProduced} onChange={this.handleInputChange} />
                    </label>
                    
                    <label htmlFor="energyType">
                        Energy Type: 
                        <input type="text" name="energyType" value={energyType} onChange={this.handleInputChange} />
                    </label>
                    
                    <CategorySelect handleChange={this.handleInputChange} category_id={category_id}/>

                    <label htmlFor="image">
                        Select Image:
                        <input type="file" onChange={ this.handleImageChange } />
                    </label>
                    <img src={img} alt="" />
                    {/*
                    <label htmlFor="category_id">
                        Category:
                        <select name="category_id" value={category_id} onChange={this.handleInputChange}>
                            {this.state.categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                        </select>
                    </label>
                    */}

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}
