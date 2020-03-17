import { RecipeModel, Ingredient } from "../models"
import { Request, Response, NextFunction } from "express"

const ingredientCleaner = (ingredient) : Ingredient => {
  const {amount, name, unit} = ingredient
  return {amount, name, unit}
}

interface Recipe {
  ingredients?: any[];
  instructions?: string;
  name?: string;
}

const recipeCleaner = (recipe : Recipe = {}) : Recipe => {
  const {ingredients, instructions, name} = recipe
  return {ingredients: (ingredients || []).map(ingredientCleaner), instructions, name}
}

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  const {id} = req.params
  let result
  try {
    result = await RecipeModel.findById(id)
  } catch (error) {
    console.log("search error: ", error)
    res.status(500).send(error.message)
    next(error)
    return
  }
  const response = recipeCleaner(result)
  res.send(response)
}
