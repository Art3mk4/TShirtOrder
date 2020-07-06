import {
    getOrders,
    getStatuses,
    setSort
} from "../../actions";

import * as I from './IDataTableOrders';

export default {
    mapStateToProps: (state): I.StateProps => ({
        orders: state.orders,
        status: state.status,
        dataIsLoading: state.dataIsLoading,
        tableSort: state.sort
    }),
    mapDispatchToProps: (dispatch): I.DispatchProps => ({
        getOrders: () => dispatch(getOrders()),
        getStatuses: () => dispatch(getStatuses()),
        changeTableSort: (by ,order) => dispatch(setSort(by,order))
    })
}