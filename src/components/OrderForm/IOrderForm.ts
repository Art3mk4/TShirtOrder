import {
    IOrderError,
    IOrderState,
    IOrderWithoutIdState, IRecordWithoutIdState, TDataIsLoading,
    TOrderRewriter, TStockState
} from "../../constants";
import {ErrorType} from "ufs-ui";

export interface StateProps {
    stock: TStockState,
    dataIsLoading: TDataIsLoading,
}

export interface DispatchProps {
    getStock: () => void;
    addOrder(order: IOrderState): void;
}

export interface OwnProps {

}

export interface State {
    values: IOrderWithoutIdState;
    errors: TOrderRewriter<IOrderError, ErrorType>;
    errorMessages: TOrderRewriter<IOrderWithoutIdState, string>;
}