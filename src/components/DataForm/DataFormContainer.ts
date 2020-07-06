import {
    addRecord
} from "../../actions";

import * as I from './IDataForm';

export default {
    mapStateToProps: (): I.StateProps => ({}),
    mapDispatchToProps: (dispatch): I.DispatchProps => ({
        addRecord: (record) => dispatch(addRecord(record))
    })
}