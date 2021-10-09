import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CarForm from './CarForm.js'
import { deleteCar, putCar } from '../fetch-utils.js'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

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
      this.props.history.push('/cars/' + this.props.id);
    }
  }

  handleSubmit = async (carData) => {
    carData.id = this.props.id;
    await putCar(carData);
    this.props.history.push('/cars');
  }

  handleDelete = async () => {
    await deleteCar(this.props.id);
    this.props.history.push('/cars');
  }

  render() {
    if (this.state.editing) {
      return (
        <CarForm {...this.props} handleSubmit={this.handleSubmit} />
      )
    }
    return (
      <Card sx={{
        width: '400px',
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
        <h2>{this.props.make + ' ' + this.props.model}</h2>
        <img src={this.props.img} className="car-img" alt="" />
        <p>Release Year: {this.props.releaseYear}</p>
        <p>Still Being Produced: {this.props.stillProduced ? "yes" : "no"}</p>
        <p>Energy Type: {this.props.energyType}</p>
        <p>Category: {this.props.category}</p>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: 'auto'
          }}
        >
          <Button variant="contained" size="small" onClick={this.handleClick}>
            {this.props.inList ? "Details" : "Edit"}
          </Button>
          <Button variant="contained" size="small" disabled>
            Buy
          </Button>
          {
            this.props.inList ?
              <></> :
              <Button variant="contained" color="error" size="small" onClick={this.handleDelete}>Delete</Button>
          }
        </Stack>
      </Card>
    )
  }
}

export default withRouter(Car);