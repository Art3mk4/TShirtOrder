import {
    IRecordState,
    IRecordWithoutIdState,
    TRecordRewriter
} from "../../constants";
import {ErrorType} from "ufs-ui";

export interface StateProps {

}

export interface DispatchProps {
    addRecord(record: IRecordState): void;
}

export interface OwnProps {

}

export interface State {
    values: IRecordWithoutIdState;
    errors: TRecordRewriter<IRecordWithoutIdState, ErrorType>;
    errorMessages: TRecordRewriter<IRecordWithoutIdState, string>;
}