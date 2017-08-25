import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import promiseMiddleware from "redux-promise"
import thunkMiddleware from "redux-thunk"

import exampleDuck from "./example-duck"

const loggerMiddleware = createLogger()
const reducers = combineReducers({ exampleDuck })

const createStoreWithMiddleware = applyMiddleware(
  authMiddleware,
  loggerMiddleware,
  promiseMiddleware,
  thunkMiddleware,
)

const store = createStore(reducers, createStoreWithMiddleware)

export default store
