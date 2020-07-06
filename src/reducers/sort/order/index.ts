import {ActionTypes, initialState, TSortOrderState} from '../../../constants';
import {IActionCreator} from "../../../actions";

export default (state = initialState.sort.order, action: IActionCreator<TSortOrderState>): TSortOrderState => {
    return action.type === ActionTypes.SET_SORT_ORDER ? action.payload : state;
};