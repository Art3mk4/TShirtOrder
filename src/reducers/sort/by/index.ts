import {ActionTypes, initialState, TSortByState} from '../../../constants';
import {IActionCreator} from "../../../actions";

export default (state = initialState.sort.by, action: IActionCreator<TSortByState>): TSortByState => {
    return action.type === ActionTypes.SET_SORT_BY ? action.payload : state;
};