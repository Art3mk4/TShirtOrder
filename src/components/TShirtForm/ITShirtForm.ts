import {
    IStockState,
    IStockWithoutIdState, TDataIsLoading, TStockRewriter, TStockState
} from "../../constants";
import {ErrorType} from "ufs-ui";

export interface StateProps {
    stock: TStockState,
    dataIsLoading: TDataIsLoading,
}

export interface DispatchProps {
    addTShirt(stock: IStockState): void;
    getStock: () => void;
}

export interface OwnProps {

}

export interface State {
    values: IStockWithoutIdState;
    errors: TStockRewriter<IStockWithoutIdState, ErrorType>;
    errorMessages: TStockRewriter<IStockWithoutIdState, string>;
}