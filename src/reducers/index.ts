import {combineReducers} from 'redux';
import {
    IInitialState
} from "../constants";

import records from "./records";
import orders from "./orders";
import sort from "./sort";
import stock from "./stock";
import status from "./status";
import dataIsLoading from "./dataIsLoading";

export default combineReducers<IInitialState>(
    {
        records,
        orders,
        stock,
        status,
        sort,
        dataIsLoading,
        hints: () => {
            return {hints: {}}
        }
    }
);