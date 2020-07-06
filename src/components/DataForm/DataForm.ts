import {connect} from 'react-redux';

import * as I from './IDataForm';
import container from './DataFormContainer';
import pl from './DataFormPL';

export default connect<I.StateProps, I.DispatchProps, I.OwnProps>(
    container.mapStateToProps,
    container.mapDispatchToProps
)(pl);