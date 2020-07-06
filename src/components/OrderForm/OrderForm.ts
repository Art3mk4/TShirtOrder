import {connect} from "react-redux";

import * as I from './IOrderForm';
import container from './OrderFormContainer';
import pl from './OrderFormPL';

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    container.mapStateToProps,
    container.mapDispatchToProps
)(pl);