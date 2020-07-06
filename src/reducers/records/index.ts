import {ActionTypes, initialState, IRecordState, TRecordState} from '../../constants';
import {IBaseActionCreator} from "../../actions";

export interface TRecordAction extends IBaseActionCreator<ActionTypes.SET_RECORDS, TRecordState> {
}

export interface IRecordAction extends IBaseActionCreator<ActionTypes.ADD_RECORD, IRecordState> {
}

export type RecordsAction = TRecordAction | IRecordAction;

export default (state = initialState.records, action: RecordsAction): TRecordState => {

    switch (action.type) {
        case ActionTypes.ADD_RECORD:
            return [action.payload, ...state];
        case ActionTypes.SET_RECORDS:
            return [...action.payload];
        default:
            return state
    }
};