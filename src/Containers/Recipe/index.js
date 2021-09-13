import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'

class Recipe extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        const {isLoading, recipe} = this.props
        if (isLoading) {
            return <LinearProgress />
        }
        if (!recipe) {
            return null
        }
        const { name, instructions, ingredients } = recipe
        return (
            <div>
                <h2>{name}</h2>
                <div>
                    <h3>Instructions</h3>
                    <p>{instructions}</p>
                </div>
                <div>
                    <h3>Ingredients</h3>
                    <ul>
                        {ingredients.map(({name, unit, amount}) => <li>{amount} {unit} of {name} </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { recipe } = state
    return {...recipe}
}

export default connect(mapStateToProps)(Recipe)