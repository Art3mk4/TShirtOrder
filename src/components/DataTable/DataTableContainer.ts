import {
    getRecords,
    setSort
} from "../../actions";

import * as I from './IDataTable';

export default {
    mapStateToProps: (state): I.StateProps => ({
        records: state.records,
        dataIsLoading: state.dataIsLoading,
        tableSort: state.sort
    }),
    mapDispatchToProps: (dispatch): I.DispatchProps => ({
        getRecords: () => dispatch(getRecords()),
        changeTableSort: (by, order) => dispatch(setSort(by, order))
    })
}