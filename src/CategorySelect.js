import React, { Component } from 'react'
import { getCategories } from './fetch-utils.js';

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
            <label htmlFor="category_id">
                Category:
                <select name="category_id" value={this.props.category_id} onChange={this.props.handleChange}>
                    {this.state.categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                </select>
            </label>
        )
    }
}
