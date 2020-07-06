import {ActionTypes, initialState, IStatusState, TStatusState} from '../../constants';
import {IBaseActionCreator} from "../../actions";

export interface TStatusAction extends IBaseActionCreator<ActionTypes.SET_STATUS, TStatusState> {
}

export interface IStatusAction extends IBaseActionCreator<ActionTypes.ADD_STATUS, IStatusState> {
}

export type StatusAction = TStatusAction | IStatusAction;

export default (state = initialState.status, action: StatusAction): TStatusState => {

    switch (action.type) {
        case ActionTypes.ADD_STATUS:
            return [action.payload, ...state];
        case ActionTypes.SET_STATUS:
            return [...action.payload];
        default:
            return state
    }
};