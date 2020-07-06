import {ActionTypes, initialState, IOrderState, TOrderState} from '../../constants';
import {IBaseActionCreator} from "../../actions";

export interface TOrderAction extends IBaseActionCreator<ActionTypes.SET_ORDERS, TOrderState> {
}

export interface IOrderAction extends IBaseActionCreator<ActionTypes.ADD_ORDER, IOrderState> {
}

export type OrdersAction = TOrderAction | IOrderAction;

export default (state = initialState.orders, action: OrdersAction): TOrderState => {

    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            return [action.payload, ...state];
        case ActionTypes.SET_ORDERS:
            return [...action.payload];
        default:
            return state
    }
};