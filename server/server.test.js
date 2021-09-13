import { createAndConnectToServer, dropDatabase} from "./db"
import getHttpServer from './server'
import { RecipeModel } from "./models"
import supertest from 'supertest'
import { expect, test } from "@jest/globals"

const app = getHttpServer()

beforeEach(async () => await createAndConnectToServer())

afterEach(async () => await dropDatabase())

test("Invalid recipe ID", async () => {
    await supertest(app).get('/api/recipe/asdf')
        .expect(400)
        .then(response => {
            expect(response.body).toStrictEqual({
                error: "Invalid Object ID"
            })
        })
})

test("Recipe ID not found", async () => {
    const recipeId = "613eec3be3d08c804d42da10"
    await supertest(app).get(`/api/recipe/${recipeId}`)
        .expect(404)
        .then(response => {
            expect(response.body).toStrictEqual({
                error: `Recipe (${recipeId}) not found`
            })
        })
})

test("Get recipe by ID", async () => {
    const recipe = await RecipeModel.findOne({})        
    await supertest(app).get(`/api/recipe/${recipe.id}`)
        .expect(200)
        .then(response => {
            expect(response.body._id).toStrictEqual(recipe.id)
        })
})

