# POC Front-end app for "Fatturazione automatica"

This is a preliminary FE app.

## To install

- Yarn install

## To run

- Edit `.env` file putting the API host as value of VITE_CSTAR_API

Then:

- Run `yarn dev` if you want to use the app on your local computer (note: CORS policy may blocks your reqeusts)

or

- Run `yarn build` to build and obtain a dist folder to serve on a web-hosting service

## To use

First of all let's generate a "SPID token" using an authenticator. Get the token (tipically shown in url as parameter) and put it in the first screen
of the web app.

Using this token you'll be able to view the on-borading flow or (if you fiscal-code is already onboarded) the transactions list.
