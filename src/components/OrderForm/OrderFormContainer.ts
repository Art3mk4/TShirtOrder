import {
    addOrder, getStock
} from "../../actions";

import * as I from './IOrderForm';

export default {
    mapStateToProps: (state): I.StateProps => ({
        stock: state.stock,
        dataIsLoading: state.dataIsLoading
    }),
    mapDispatchToProps: (dispatch): I.DispatchProps => ({
        getStock: () => dispatch(getStock()),
        addOrder: (order) => dispatch(addOrder(order)),
    })
}