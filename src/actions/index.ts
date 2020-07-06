declare var Promise: any;

import {
    ActionTypes,
    IOrderState,
    IRecordState,
    IStockState,
    recordsInitialData,
    TDataIsLoading,
    TOrderState,
    TRecordIdState,
    TRecordState,
    TSortByState,
    TSortOrderState,
    TStatusState,
    TStockState
} from '../constants';

import {CancelToken, isCancel, setServiceConfig} from 'ufs-ui';

import Axios from "axios";

setServiceConfig('http://localhost:3000', {
    maxParallelRequests: 3
});

const source = CancelToken.source();

export interface IBaseActionCreator<T, P> {
    type: T;
    payload: P;
}

export interface IActionCreator<P> extends IBaseActionCreator<ActionTypes, P> {
    type: ActionTypes;
    payload: P;
}

export function actionCreator<T>(actionType: ActionTypes, data: T): IActionCreator<T> {
    return {
        type: actionType,
        payload: data
    }
}

export function setSortBy(by: TSortByState): IActionCreator<TSortByState> {
    return actionCreator<TSortByState>(ActionTypes.SET_SORT_BY, by);
}

export function setSortOrder(order: TSortOrderState): IActionCreator<TSortOrderState> {
    return actionCreator<TSortOrderState>(ActionTypes.SET_SORT_ORDER, order);
}

export function setDataLoading(isLoading: TDataIsLoading): IActionCreator<TDataIsLoading> {
    return actionCreator<TDataIsLoading>(ActionTypes.SET_DATA_LOADING, isLoading);
}

export function setRecords(records: TRecordState): IActionCreator<TRecordState> {
    return actionCreator<TRecordState>(ActionTypes.SET_RECORDS, records)
}

export function addRecord(record: IRecordState) {
    return actionCreator<IRecordState>(ActionTypes.ADD_RECORD, record)
}

export function removeRecord(recordId: TRecordIdState) {
    return actionCreator<TRecordIdState>(ActionTypes.REMOVE_RECORD, recordId)
}

export function setOrders(orders: TOrderState): IActionCreator<TOrderState> {
    return actionCreator<TOrderState>(ActionTypes.SET_ORDERS, orders)
}

export function addOrder(order: IOrderState) {
    return actionCreator<IOrderState>(ActionTypes.ADD_ORDER, order)
}

export function setStock(stock: TStockState): IActionCreator<TStockState> {
    return actionCreator<TStockState>(ActionTypes.SET_STOCK, stock)
}

export function addStock(stock: IStockState) {
    return actionCreator<IStockState>(ActionTypes.ADD_STOCK, stock)
}

export function setStatus(status: TStatusState): IActionCreator<TStatusState> {
    return actionCreator<TStatusState>(ActionTypes.SET_STATUS, status)
}

export function addStatus(status: IStockState) {
    return actionCreator<IStockState>(ActionTypes.ADD_STATUS, status)
}

export function setSort(by: TSortByState, order: TSortOrderState) {
    return (dispatch) => {
        dispatch(setSortBy(by));
        dispatch(setSortOrder(order));
    }
}

export function getRecords() {
    return (dispatch) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(setRecords(recordsInitialData));
                dispatch(setDataLoading(true));
                resolve();
            }, 100)
        });
    }
}

export function getOrders() {
    return (dispatch) => {
        return new Promise((resolve) => {
            Axios.get('http://localhost:3000/orders', {
                cancelToken: source.token
            }).catch(function (thrown) {
                if (isCancel(thrown)) {
                    console.log('Запрос отменён', thrown.message);
                } else {
                    // обработка ошибки
                }
            }).then(response => {
                dispatch(setOrders(response['data']));
                dispatch(setDataLoading(true));
                resolve();
            });
        });
    }
}

export function getStock() {
    return (dispatch) => {
        return new Promise((resolve) => {
            Axios.get('http://localhost:3000/sizes', {
                cancelToken: source.token
            }).catch(function (thrown) {
                if (isCancel(thrown)) {
                    console.log('Запрос отменён', thrown.message);
                } else {
                    // обработка ошибки
                }
            }).then(response => {
                dispatch(setStock(response['data']));
                dispatch(setDataLoading(true));
                resolve();
            });
        });
    }
}

export function getStatuses() {
    return (dispatch) => {
        return new Promise((resolve) => {
            Axios.get('http://localhost:3000/statuses', {
                cancelToken: source.token
            }).catch(function (thrown) {
                if (isCancel(thrown)) {
                    console.log('Запрос отменён', thrown.message);
                } else {
                    // обработка ошибки
                }
            }).then(response => {
                dispatch(setStatus(response['data']));
                dispatch(setDataLoading(true));
                resolve();
            });
        });
    }
}