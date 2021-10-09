import React, { Component } from 'react'
import CategorySelect from './CategorySelect.js';
import { getCategories, uploadImg } from '../fetch-utils.js';
import { Card, Checkbox, FormControlLabel, TextField, Input, Button } from '@mui/material';

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
    } else if (e.target.name === "category_id" || e.target.type === "number") {
      value = Number(e.target.value);
    }
    console.log({ [e.target.name]: value })
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
      <Card sx={{
        width: '450px',
        borderRadius: '12px',
        border: '2px solid #202070',
        backgroundColor: '#000020',
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <form onSubmit={this.handleSubmit} className="sell-form">
          <TextField
            label="Make"
            value={make}
            variant="outlined"
            name="make"
            onChange={this.handleInputChange}
          />

          <TextField
            label="Model"
            value={model}
            variant="outlined"
            name="model"
            onChange={this.handleInputChange}
          />

          <TextField
            label="Year Released"
            value={releaseYear}
            variant="outlined"
            type="number"
            name="releaseYear"
            onChange={this.handleInputChange}
          />

          <TextField
            label="Energy Type"
            value={energyType}
            variant="outlined"
            name="energyType"
            onChange={this.handleInputChange}
          />

          <CategorySelect handleChange={this.handleInputChange} category_id={category_id} />

          <FormControlLabel
            control={
              <Checkbox
                checked={stillProduced}
                name="stillProduced"
                onChange={this.handleInputChange}
              />
            }
            label="Still Produced"
          />

          <label htmlFor="contained-button-file">
            <Input
              type="file"
              id="contained-button-file"
              onChange={this.handleImageChange} 
              sx={{
                display: 'none'
              }}
            />
            <Button
              variant="outlined"
              component="span"
              sx={{
                marginTop: '16px',
                marginBottom: '0px'
              }}
            >
              Select Image
            </Button>
          </label>
          <img src={img} alt="" />

          <Button
            variant="outlined"
            sx={{
              margin: '16px'
            }}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Card>
    )
  }
}
