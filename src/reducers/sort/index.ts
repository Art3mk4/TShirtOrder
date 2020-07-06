import {combineReducers} from 'redux';
import {
    ISortState
} from "../../constants";

import by from "./by";
import order from "./order";

export default combineReducers<ISortState>(
    {
        by,
        order
    }
);