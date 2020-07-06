import {ActionTypes, initialState, IStockState, TStockState} from '../../constants';
import {IBaseActionCreator} from "../../actions";

export interface TStockAction extends IBaseActionCreator<ActionTypes.SET_STOCK, TStockState> {
}

export interface IStockAction extends IBaseActionCreator<ActionTypes.ADD_STOCK, IStockState> {
}

export type StockAction = TStockAction | IStockAction;

export default (state = initialState.stock, action: StockAction): TStockState => {

    switch (action.type) {
        case ActionTypes.ADD_STOCK:
            return [action.payload, ...state];
        case ActionTypes.SET_STOCK:
            return [...action.payload];
        default:
            return state
    }
};