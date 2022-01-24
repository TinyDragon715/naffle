import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "reducers";
import createSagaMiddleware from "@redux-saga/core";

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run('Hello Saga');