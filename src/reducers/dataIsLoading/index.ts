import {ActionTypes, initialState, TDataIsLoading} from '../../constants';
import {IActionCreator} from "../../actions";

export default (state = initialState.dataIsLoading, action: IActionCreator<TDataIsLoading>): TDataIsLoading => {
    return action.type === ActionTypes.SET_DATA_LOADING ? action.payload : state;
};