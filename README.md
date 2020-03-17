# What To Make

## Installation

Run:

    yarn

This will install all packages and get it ready to start.

## Development

To bring up locally run:

    yarn start

This will start the backend, run webpack, and handle request proxying for the front end.

## API

### /api/search

`method`: POST

`body`:

  * name - the recipe name
  * ingredients - array of ingredients

`response`: Array of `{id:string, name:string}`

### /api/recipe/:id

`method`: GET

`response`:

```js
{
  name: string,
  ingredients: string[]
}
```


## TODOs

  1. fix the search function
  1. add a recipe component to display the response
  1. add routing so that you can land on a recipe page or reload and have the same search
  1. add unit tests using jest, mocha, ava, or jasmine
  1. add integration tests using puppeteer, webdriver, or selenium powered tests
