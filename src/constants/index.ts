import {SortOrder} from 'ufs-ui';

export const recordsInitialData: TRecordState = [
    {
        id: 'FEDOR',
        inn: 239873498724,
        kpp: 2309849039,
        name: 'ООО «Федор Двинятин»',
        sum: 12
    },
    {
        id: 'BORIS',
        inn: 234098240239,
        kpp: 3849483746,
        name: 'ООО «Борис Бурда»',
        sum: 3
    },
    {
        id: 'SERGEY',
        inn: 102983097304,
        kpp: 2723849392,
        name: 'ООО «Сергей Рублев и компания»',
        sum: 46
    },
    {
        id: 'ALEX',
        inn: 123456789012,
        kpp: 1234567890,
        name: 'ООО «Александр Друзь»',
        sum: 777
    },
    {
        id: 'HORNS',
        inn: 230920398302,
        kpp: 3893948209,
        name: 'ООО «Рога и копыта 2049»',
        sum: 0,
        disabled: true
    }
];

export const ordersInitialData: TOrderState = [
    {
        _id: 'IVANOV',
        fullname: 'Иванов Иван Иванович',
        workplace: '50',
        size: {
            _id: 'XXXL',
            name: 'XXXL'
        },
        orderTime: '-',
        shipmentDate: '-',
        status: {
            _id: 'Поступил',
            name: 'Поступил'
        }
    }
];

export const stockInitialData: TStockState = [
    {
        _id: 'XXL',
        name: 'XXL',
        reserved: 0,
        total: 10
    }
];

export type TRecordIdState = string;

export interface IRecordWithoutIdState {
    inn: number;
    kpp: number;
    name: string;
    sum: number;
    disabled?: boolean;
}

export interface IRecordState extends IRecordWithoutIdState {
    id: TRecordIdState;
}

export interface Size {
    _id: string;
    name: string;
}

export interface IStatus {
    _id: TRecordIdState;
    name: string;
}

export interface IOrderWithoutIdState {
    fullname: string,
    size: Size,
    workplace: string,
    orderTime: string,
    shipmentDate: string,
    status: IStatus
}

export interface IOrderError {
    fullname: string,
    size: string,
    workplace: string,
    orderTime: string,
    shipmentDate: string,
    status: string
}

export interface IOrderState extends IOrderWithoutIdState {
    _id: TRecordIdState;
}

export interface IStockWithoutIdState {
    name: string,
    reserved: number,
    total: number;
}

export interface IStatusWithoutIdState {
    name: string,
}

export interface IStockState extends IStockWithoutIdState {
    _id: TRecordIdState;
}

export interface IStatusState extends IStatusWithoutIdState {
    _id: TRecordIdState;
}

export type TRecordRewriter<T, S> = {
    [P in keyof T]: S;
};

export type TOrderRewriter<T, S> = {
    [P in keyof T]: S;
};

export type TStockRewriter<T, S> = {
    [P in keyof T]: S;
}

export type TSortByState = string;
export type TSortOrderState = SortOrder;

export interface ISortState {
    by: TSortByState;
    order: TSortOrderState;
}

export type TDataIsLoading = boolean;
export type TRecordState = IRecordState[];
export type TOrderState = IOrderState[];
export type TStockState = IStockState[];
export type TStatusState = IStatusState[];

export interface IInitialState {
    records: TRecordState,
    orders: TOrderState,
    stock: TStockState,
    status: TStatusState,
    sort: ISortState,
    dataIsLoading: TDataIsLoading
    hints: any
}

export const initialState: IInitialState = {
    records: [],
    orders: [],
    stock: [],
    status: [],
    sort: {
        by: '',
        order: SortOrder.DESC
    },
    dataIsLoading: false,
    hints: {
        hints: {}
    }
};

export enum ActionTypes {
    SET_SORT_BY = 'setSortBy',
    SET_SORT_ORDER = 'setSortOrder',
    SET_RECORDS = 'setRecords',
    ADD_RECORD = 'addRecord',
    REMOVE_RECORD = 'removeRecord',
    SET_ORDERS = 'setOrders',
    ADD_ORDER = 'addOrder',
    SET_STOCK = 'setStock',
    ADD_STOCK = 'addStock',
    SET_DATA_LOADING = 'setDataLoading',
    SET_STATUS = 'setStatus',
    ADD_STATUS = 'addStatus'
}