import {connect} from 'react-redux';

import * as I from './IDataTable';
import container from './DataTableContainer';
import pl from './DataTablePL';

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    container.mapStateToProps,
    container.mapDispatchToProps
)(pl);