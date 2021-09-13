import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HomeWrapper } from "./styles"
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Recipe from '../Recipe'
import * as actions from '../../actions'

const ingredientList = [
  "flour", "sugar", "salt", "butter", "milk"
]

const getParamData = (props) => {
  const urlParams = new URLSearchParams(props.location.search)
  return {
    selected: urlParams.get('selected'),
    term: urlParams.get('term') || '',
    ingredients: (urlParams.get('ingredients') || '').split(',')
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.changeUrlParams = this.changeUrlParams.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      term: "",
      ingredients: [""],
      selected: null
    }
  }
  componentDidMount() {
    const {selected, term, ingredients} = getParamData(this.props)
    const { searchRecipes } = this.props
    searchRecipes(term, ingredients)
    if (selected) {
      this.handleSelect(selected)
    }
    this.setState({selected, term, ingredients})
  }
  changeUrlParams(params) {
    const urlParams = new URLSearchParams(this.props.location.search)
    for (var key in params) {
      urlParams.set(key, params[key])
    }
    this.props.history.push({search: `?${urlParams.toString()}`})
  }
  fetchSearch () {
    const { searchRecipes } = this.props
    const { term, ingredients } = this.state

    this.changeUrlParams({
      term, ingredients: ingredients.join(',')
    })

    searchRecipes(term, ingredients)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({term})
  }
  handleIngredient(ingredient, event) {
    const {ingredients} = {...this.state}
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ingredients})
  }
  handleSelect(id) {
    const { findRecipe } = this.props

    this.setState({selected: id})
    this.changeUrlParams({selected: id})
    findRecipe(id)
  }
  render () {
    const {term, ingredients} = this.state
    const {recipes, isLoading} = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map(
            ingredient => (
              <FormControlLabel
                key={ingredient}
                control={
                  <Checkbox
                    checked={ingredients.includes(ingredient)}
                    onChange={this.handleIngredient.bind(this, ingredient)}
                    value={ingredient}
                  />
                }
                label={ingredient}
              />
            )
          )}
        </div>
        <Button onClick={this.fetchSearch}>
          search
        </Button>
        <Divider />
        {
          recipes && (
            <List>
              {recipes.map( recipe =>
                <ListItem key={recipe.id} onClick={() => this.handleSelect(recipe.id)}>
                  <ListItemText primary={recipe.name} />
                </ListItem>
              )}
            </List>
          )
        }
        {isLoading && <LinearProgress />}
        <Divider />
        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return {...search}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchRecipes: actions.searchRecipes,
  findRecipe: actions.findRecipe
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
