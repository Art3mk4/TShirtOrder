import * as React from 'react';
import Axios, {AxiosResponse} from "axios";
import {
    Loader,
    LoaderSize,
    Table, Tbody,
    Td, Th,
    Thead, Tr,
    DropdownMenu, Button, ButtonType,
    Icon, IconType,
    DropdownMenuTarget, DropdownMenuItem
} from "ufs-ui";
import * as _ from 'lodash';

import * as I from './IDataTableOrders';
import {SortOrder} from "ufs-ui/dist/lib/components/Table/Th";
import {IOrderState, TOrderState} from "../../constants";

export default class DataTablePLOrders extends React.Component<I.OwnProps & I.StateProps & I.DispatchProps, I.State>{

    orderId: string;

    private sortData = (row1: IOrderState, row2: IOrderState): number => {
        const {by: sortedBy, order: sortOrder} = this.props.tableSort;

        const isAsc = sortOrder === SortOrder.ASC;
        if (row1[sortedBy] < row2[sortedBy]) {
            return isAsc ? -1 : 1;
        } else if (row1[sortedBy] > row2[sortedBy]) {
            return isAsc ? 1 : -1;
        } else {
            return 0;
        }
    };

    rowSelect = (id) => () => {
        this.orderId = id;
        console.log(id, this.props);
    }

    entered = () => {
        console.log('entered');
        this.changeStatus('zCna9JadQOay6kd6','Поступил');
        this.setState((prevState) => {
            return {
                ...prevState
            }
        });
    }

    confirmed = () => {
        console.log('confirmed');
        this.changeStatus('mmnBqz3TzN1KJuzd', 'Подтвержден');
        this.setState((prevState) => {
           return {
               ...prevState
           }
        });
    }

    transferred = () => {
        console.log('transferred');
        this.changeStatus('rLWEV66tm1suBgap', 'Выдан');
        this.setState((prevState) => {
            return {
                ...prevState
            }
        });
    }

    canceled = () => {
        console.log('canceled');
        this.changeStatus('6hYOgbjhS8gdQV1x', 'Отменен');
        this.setState((prevState) => {
            return {
                ...prevState
            }
        });
    }

    private checkStatus = (row: IOrderState) => {
        console.log('check status: '+row.status._id);
        switch (row.status._id) {
            case 'zCna9JadQOay6kd6':
                return this.renderEnterOperation(row);
            case 'mmnBqz3TzN1KJuzd':
                return this.renderConfirmOperation(row);
            case 'rLWEV66tm1suBgap':
                return this.renderTransferOperation(row);
            case '6hYOgbjhS8gdQV1x':
                return this.renderCancelOperation(row);
            default:
                return this.renderOperation(row);
        }
    }

    private changeStatus = (id: string, name: string) => {
        this.props.orders.map((data) => {
            if (data._id === this.orderId) {
                data.status.name = name;
                data.status._id = id;
                Axios.post(
                    'http://localhost:3000/orders/update',
                    {
                        status: {
                            _id: id,
                            name: name
                        },
                        _id: this.orderId
                    }
                ).then((response) => {
                    console.log(response, data);
                });
            }
        });
    }

    private renderRows = (row: IOrderState): JSX.Element => (
        <Tr key={row._id}>
            <Td>{row.fullname}</Td>
            <Td>{row.workplace}</Td>
            <Td>{row.size.name}</Td>
            <Td>{row.orderTime}</Td>
            <Td>{row.shipmentDate}</Td>
            <Td>
                {this.checkStatus(row)}
            </Td>
        </Tr>
    )

    private renderEnterOperation = (row: IOrderState): JSX.Element => (
        <DropdownMenu>
            <DropdownMenuTarget>
                <Button type={ButtonType.GHOST} onClick={this.rowSelect(row._id)}>
                    {row.status.name}
                    <Icon type={IconType.LIST_MENU} />
                </Button>
            </DropdownMenuTarget>

            <DropdownMenuItem danger operation={this.entered}>
                Поступил
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.confirmed}>
                Подтверждён
            </DropdownMenuItem>

            <DropdownMenuItem disabled operation={this.transferred}>
                Выдан
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.canceled}>
                Отменен
            </DropdownMenuItem>
        </DropdownMenu>
    )

    private renderConfirmOperation = (row: IOrderState): JSX.Element => (
        <DropdownMenu>
            <DropdownMenuTarget>
                <Button type={ButtonType.GHOST} onClick={this.rowSelect(row._id)}>
                    {row.status.name}
                    <Icon type={IconType.LIST_MENU} />
                </Button>
            </DropdownMenuTarget>

            <DropdownMenuItem disabled operation={this.entered}>
                Поступил
            </DropdownMenuItem>

            <DropdownMenuItem danger operation={this.confirmed}>
                Подтверждён
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.transferred}>
                Выдан
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.canceled}>
                Отменен
            </DropdownMenuItem>
        </DropdownMenu>
    )

    private renderTransferOperation = (row:IOrderState):JSX.Element => (
        <DropdownMenu>
            <DropdownMenuTarget>
                <Button type={ButtonType.GHOST} onClick={this.rowSelect(row._id)}>
                    {row.status.name}
                    <Icon type={IconType.LIST_MENU} />
                </Button>
            </DropdownMenuTarget>

            <DropdownMenuItem disabled operation={this.entered}>
                Поступил
            </DropdownMenuItem>

            <DropdownMenuItem disabled operation={this.confirmed}>
                Подтверждён
            </DropdownMenuItem>

            <DropdownMenuItem danger operation={this.transferred}>
                Выдан
            </DropdownMenuItem>

            <DropdownMenuItem disabled operation={this.canceled}>
                Отменен
            </DropdownMenuItem>
        </DropdownMenu>
    )

    private renderCancelOperation = (row: IOrderState):JSX.Element => (
        <DropdownMenu>
            <DropdownMenuTarget>
                <Button type={ButtonType.GHOST} onClick={this.rowSelect(row._id)}>
                    {row.status.name}
                    <Icon type={IconType.LIST_MENU} />
                </Button>
            </DropdownMenuTarget>

            <DropdownMenuItem disabled operation={this.entered}>
                Поступил
            </DropdownMenuItem>

            <DropdownMenuItem disabled operation={this.confirmed}>
                Подтверждён
            </DropdownMenuItem>

            <DropdownMenuItem disabled operation={this.transferred}>
                Выдан
            </DropdownMenuItem>

            <DropdownMenuItem danger operation={this.canceled}>
                Отменен
            </DropdownMenuItem>
        </DropdownMenu>
    )

    private renderOperation = (row:IOrderState):JSX.Element => (
        <DropdownMenu>
            <DropdownMenuTarget>
                <Button type={ButtonType.GHOST} onClick={this.rowSelect(row._id)}>
                    {row.status.name}
                    <Icon type={IconType.LIST_MENU} />
                </Button>
            </DropdownMenuTarget>
            <DropdownMenuItem operation={this.confirmed}>
                Подтверждён
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.transferred}>
                Выдан
            </DropdownMenuItem>

            <DropdownMenuItem operation={this.canceled}>
                Отменен
            </DropdownMenuItem>
        </DropdownMenu>
    )

    private renderData(info: TOrderState) {
        return info.map(this.renderRows);
    }

    private renderSortedData(info: TOrderState) {
        const data = this.props.tableSort.by === undefined ?
            info: [...info].sort(this.sortData);
        return data.map(this.renderRows);
    }

    componentDidMount() {
        if (_.isEmpty(this.props.orders)) {
            this.props.getOrders();
        }
        if (_.isEmpty(this.props.status)) {
            this.props.getStatuses();
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.dataIsLoading &&
                    <Loader size={LoaderSize.LG} message="Данные загружаются" />
                }
                {
                    this.props.dataIsLoading &&
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>ФИО</Th>
                                <Th>Рабочее место</Th>
                                <Th>Размер</Th>
                                <Th>Дата заказа</Th>
                                <Th>Дата доставки</Th>
                                <Th>Статус</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.renderData(this.props.orders)}
                        </Tbody>
                    </Table>
                }
            </div>
        )
    }
}