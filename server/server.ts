import express from "express"
import bodyParser from "body-parser"
import http from "http"
import { searchMiddleware, recipeMiddleware } from "./routes"

const getHttpServer = () => {
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  // create our routes
  app.post('/api/search', searchMiddleware)
  app.get('/api/recipe/:id', recipeMiddleware)
  // create a server
  return new http.Server(app)
}

export default getHttpServer