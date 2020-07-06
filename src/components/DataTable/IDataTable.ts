import {
    ISortState,
    TDataIsLoading,
    TRecordState,
    TSortByState,
    TSortOrderState
} from "../../constants";

export interface StateProps {
    records: TRecordState;
    dataIsLoading: TDataIsLoading;
    tableSort: ISortState
}

export interface DispatchProps {
    getRecords: () => void;
    changeTableSort: (by: TSortByState, order: TSortOrderState) => void;
}

export interface OwnProps {

}

export interface State {

}