## readme and project not done yet.

# <a href="https://aedes-web.netlify.app/">Aedes-web</a>

- An admin dashboard of an system in which the main purpose is to control the cases of Aedes aegypti mosquitoes in the city of Bagé in Rio Grande do Sul, Brazil. There is also an `aedes-app` in which the users report mosquitoes cases and at this dashboard the municipal employees can visualize and then this cases.
- I developed this website as part of my Scientific initiation scholarship at IFSUL - Campus Bagé. And also enjoyed as part of my `Final paper`. In portuguese: `TCC - Trabalho de conclusão de curso`.

## What is the backend ?

- A GraphQL Api, more details on: https://github.com/godinhojoao/aedes-api

<!-- ## What I used to develop this frontend ?

- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [ApolloClient](https://www.apollographql.com/docs/react/)
- [Sass](https://sass-lang.com/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Eslint](https://eslint.org)
- [Husky](https://github.com/typicode/husky) -->

## Getting Started

### Run development application

- First you need to create an .env with the content: `VITE_AEDES_API_URL=localhost url where aedes-api is running`

```bash
nvm install 16
nvm use
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Commands

- `dev`: run development application
- `build`: creates the production build version
- `lint`: runs the linter in all components and pages
- `lint-fix`: fix all linter erros automatically
- `test`: runs jest to run all tests

<p align="center">Made by João Godinho</p>