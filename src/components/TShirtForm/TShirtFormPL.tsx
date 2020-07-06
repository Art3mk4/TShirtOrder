import * as React from 'react';
import Axios, {AxiosResponse} from "axios";
import * as _ from 'lodash';
import {
    Button,
    Cell, ErrorType,
    FormLayout,
    NotificationContainer,
    NumberLabel,
    NumberInput,
    RowLayout,
    TextInput,
    Loader,
    LoaderSize, Table, Tbody, Td, Th, Thead, Tr
} from "ufs-ui";

import {generateId} from "../../utils";

import * as I from './ITShirtForm';
import {IStockState, TStockState} from "../../constants";

interface Field {
    id: string;
    label: string;
    Component: React.ComponentClass<any>
}

const fields: Field[] = [
    {
        id: 'size',
        label: 'Размер',
        Component: TextInput,
    }
];

const initialDataTShirtFormValues = {
    name: undefined,
    reserved: undefined,
    total: undefined
};

const initialDataTShirtFormState: I.State = {
    values: {...initialDataTShirtFormValues},
    errors: {...initialDataTShirtFormValues},
    errorMessages: {...initialDataTShirtFormValues}
};

export default class TShirtFormPL extends React.Component<I.OwnProps & I.StateProps & I.DispatchProps, I.State> {
    static displayName = 'TShirtForm';

    state: I.State = _.cloneDeep(initialDataTShirtFormState);

    handleAdd = (input, props) => (value) => {
        if (props) {
            this.props.stock.map((data) => {
                if (data._id === input) {
                    data.total = data.total + props;
                    Axios.post(
                        'http://localhost:3000/sizes/update',
                        {
                            name: data.name,
                            _id: data._id,
                            total: props,
                        }
                    )
                }
            });
        }

        this.setState((prevState) => {
            prevState.values[input] = props;
            prevState.errors[input] = undefined;
            prevState.errorMessages[input] = undefined;

            return {
                ...prevState
            }
        });
    };

    inputCallback = (input) => (value) => {
        this.setState((prevState) => {
            prevState.values[input] = value;
            prevState.errors[input] = undefined;
            prevState.errorMessages[input] = undefined;

            return {
                ...prevState
            }
        });
    };

    private renderRows = (row: IStockState): JSX.Element => (
        <Tr key={row._id}>
            <Td>{row.name}</Td>
            <Td>
                {row.reserved}
            </Td>
            <Td>{row.total}</Td>
            <Td>
                <RowLayout>
                <Cell>
                    <NumberInput onChange={this.inputCallback(row._id)}
                               value={this.state.values[row._id]}
                               error={this.state.errors[row._id]}
                               errorMessage={this.state.errorMessages[row._id]}></NumberInput>
                </Cell>
                <Cell>
                    <Button onClick={this.handleAdd(row._id, this.state.values[row._id])}>Добавить</Button>
                </Cell>
                </RowLayout>
            </Td>
        </Tr>
    )

    private renderData(info: TStockState) {
        return info.map(this.renderRows);
    }

    componentDidMount() {
        if (_.isEmpty(this.props.stock)) {
            this.props.getStock();
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
                                <Th>Размер</Th>
                                <Th>Зарезервировано</Th>
                                <Th>Всего</Th>
                                <Th>Добавить Футболок</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.renderData(this.props.stock)}
                        </Tbody>
                    </Table>
                }
            </div>
        )
    }
}