import * as React from 'react';
import {
    Loader,
    LoaderSize, Table, Tbody, Td, Th, Thead, Tr
} from "ufs-ui";
import * as _ from 'lodash';

import * as I from './IDataTable';
import {SortOrder} from "ufs-ui/dist/lib/components/Table/Th";
import {IRecordState, TRecordState} from "../../constants";

export default class DataTablePL extends React.Component<I.OwnProps & I.StateProps & I.DispatchProps, I.State> {

    private sortData = (row1: IRecordState, row2: IRecordState): number => {
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

    private renderSortedData(info: TRecordState) {
        const data = this.props.tableSort.by === undefined ?
            info :
            [...info].sort(this.sortData);

        return data.map(this.renderRows);
    }

    private onColumnClick = (name: string) => () => {
        let {by: sortedBy, order: sortOrder} = this.props.tableSort;

        if (name !== sortedBy || sortOrder === undefined) {
            sortedBy = name;
            sortOrder = SortOrder.ASC;
        } else if (sortOrder === SortOrder.ASC) {
            sortOrder = SortOrder.DESC;
        } else {
            sortedBy = '';
            sortOrder = SortOrder.DESC;
        }
        this.props.changeTableSort(sortedBy, sortOrder);
    }

    private renderRows = (row: IRecordState): JSX.Element => (
        <Tr key={row.id}>
            <Td>{row.inn}</Td>
            <Td>{row.kpp}</Td>
            <Td>{row.name}</Td>
            <Td hAlign="right">{row.sum}</Td>
        </Tr>
    )

    private getSortOrder(name) {
        return this.props.tableSort.by === name ? this.props.tableSort.order : undefined;
    }

    componentDidMount() {
        if (_.isEmpty(this.props.records)) {
            this.props.getRecords();
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.dataIsLoading &&
                    <Loader size={LoaderSize.LG} message="Данные загружаются"/>
                }
                {
                    this.props.dataIsLoading &&
                    <Table>
                        <Thead>
                        <Tr>
                            <Th colSpan={2}>
                                Налоговые данные
                            </Th>
                            <Th
                                sortable
                                width={250}
                                rowSpan={2}
                                sortOrder={this.getSortOrder('name')}
                                onClick={this.onColumnClick('name')}
                                vAlign="top"
                            >
                                Наименование клиента
                            </Th>
                            <Th
                                sortable
                                width={150}
                                rowSpan={2}
                                hAlign="right"
                                sortOrder={this.getSortOrder('sum')}
                                onClick={this.onColumnClick('sum')}
                                vAlign="top"
                            >
                                Сумма
                            </Th>
                        </Tr>
                        <Tr>
                            <Th
                                sortable
                                sortOrder={this.getSortOrder('inn')}
                                onClick={this.onColumnClick('inn')}
                            >
                                ИНН
                            </Th>
                            <Th
                                sortable
                                sortOrder={this.getSortOrder('kpp')}
                                onClick={this.onColumnClick('kpp')}
                            >
                                КПП
                            </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {this.renderSortedData(this.props.records)}
                        </Tbody>
                    </Table>
                }
            </div>
        )
    }
}
