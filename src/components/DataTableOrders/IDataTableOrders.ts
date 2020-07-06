import {
    ISortState,
    TDataIsLoading,
    TOrderState,
    TSortByState,
    TSortOrderState,
    TStatusState
} from "../../constants";

export interface StateProps {
    orders: TOrderState,
    status: TStatusState,
    dataIsLoading: TDataIsLoading,
    tableSort: ISortState
}

export interface DispatchProps {
    getOrders: () => void;
    getStatuses: () => void;
    changeTableSort: (by: TSortByState, order: TSortOrderState) => void;
}

export interface OwnProps {

}

export interface State {

}