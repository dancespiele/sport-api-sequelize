# Sport API
This is a backend example using [express](https://expressjs.com/) with [sequelize](http://docs.sequelizejs.com/)

## Requirements

* Sqlite
* Node

## Download

`git clone git@github.com:dancespiele/sport-api-sequelize.git`

Enter to the folder and execute:

```
`yarn` or `yarn install`
```

## Settings

Create a script file ***run.sh*** in root path of the project:

```
export SECRET=your secret
export EXP=1
export SERVICE_PORT=8000

node_modules/.bin/nodemon --watch 'app/**/**' ./app/index.js
```


## RUN

`yarn run watch`

## RUN INTEGRATIONS TEST

With the project running:

`yarn test`

## API Docs

With the project running go to the browser to the link `http://localhost:8000/api-docs/`
