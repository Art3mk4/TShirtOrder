import {
    addStock, getStock
} from "../../actions";

import * as I from './ITShirtForm';

export default {
    mapStateToProps: (state): I.StateProps => ({
        stock: state.stock,
        dataIsLoading: state.dataIsLoading
    }),
    mapDispatchToProps: (dispatch): I.DispatchProps => ({
        getStock: () => dispatch(getStock()),
        addTShirt:(stock) => dispatch(addStock(stock))
    })
}