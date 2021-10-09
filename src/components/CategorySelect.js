import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { Component } from 'react'
import { getCategories } from '../fetch-utils.js';

//Required props: handleChange<function>
export default class CategorySelect extends Component {

  state = {
    categories: [],
  }

  componentDidMount = async () => {
    const categories = await getCategories();

    if (this.props.showAny) {
      categories.unshift({
        id: -1,
        name: 'Any'
      });
    }
    this.setState({ categories: categories })
  }

  render() {
    return (
      <FormControl
        sx={{
          width: '200px'
        }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          value={this.props.category_id}
          label="Category"
          onChange={this.props.handleChange}
          name="category_id"
        >
          {this.state.categories.map(category => 
            <MenuItem value={category.id}>{category.name}</MenuItem>)}
          {/*
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          */}
        </Select>
      </FormControl>
      /*
      <label htmlFor="category_id">
          Category:
          <select name="category_id" value={this.props.category_id} onChange={this.props.handleChange}>
              {this.state.categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
          </select>
      </label>
      */
    )
  }
}
