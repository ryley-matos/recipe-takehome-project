import mongoose from "mongoose"
import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  // TODO fetch and return a recipe
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const recipeId = mongoose.Types.ObjectId(req.params.id)
    const recipe = await RecipeModel.findById(recipeId)
    if (!recipe) {
      res.status(404).send({ error: `Recipe (${recipeId}) not found`})
    }
    else {
      res.send(recipe)
    }
  }
  else {
    res.status(400).send({ error: 'Invalid Object ID'})
  }
}
