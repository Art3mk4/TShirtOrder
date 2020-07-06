import {connect} from "react-redux";

import * as I from './ITShirtForm';
import container from './TShirtFormContainer';
import pl from './TShirtFormPL';

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    container.mapStateToProps,
    container.mapDispatchToProps
)(pl);