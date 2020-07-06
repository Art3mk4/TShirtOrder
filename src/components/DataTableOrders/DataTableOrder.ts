import {connect} from 'react-redux';

import * as I from './IDataTableOrders';
import container from './DataTableOrderContainer';
import pl from './DataTablePLOrders';

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    container.mapStateToProps,
    container.mapDispatchToProps
)(pl);