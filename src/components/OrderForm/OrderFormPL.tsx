import * as React from 'react';
import Axios, {AxiosResponse} from "axios";
import * as _ from 'lodash';
import {
    Button,
    Cell,
    ErrorType,
    Select,
    OptionItem,
    FormLayout,
    NotificationContainer,
    NumberInput,
    RowLayout,
    TextInput,
} from "ufs-ui";

import { generateId } from '../../utils';

import * as I from './IOrderForm';

const initialDataOrderFormValues = {
    fullname: undefined,
    workplace: undefined,
    size: {
        _id: undefined,
        name: undefined
    },
    orderTime: undefined,
    shipmentDate: undefined,
    status: {
        name: undefined,
        _id: undefined
    }
};

const initialDataOrderErrorValues = {
    fullname: undefined,
    workplace: undefined,
    size: undefined,
    orderTime: undefined,
    shipmentDate: undefined,
    status: undefined
}

const initialDataOrderFormState: I.State = {
    values: {...initialDataOrderFormValues},
    errors: {...initialDataOrderErrorValues},
    errorMessages: {...initialDataOrderErrorValues}
};

export default class OrderFormPL extends React.Component<I.OwnProps & I.StateProps & I.DispatchProps, I.State> {
    static displayName = 'OrderForm';

    state: I.State = _.cloneDeep(initialDataOrderFormState);

    handleSave = () => {
        let _id;
        const errors: I.State['errors'] = {...initialDataOrderErrorValues};
        const errorMessages: I.State['errorMessages'] = {...initialDataOrderErrorValues};
        let hasErrors = false;

        /*for (let input in this.state.values) {
            if (this.state.values[input] === null || this.state.values[input] === undefined) {
                hasErrors = true;
                errors[input] = ErrorType.ERROR;
                errorMessages[input] = 'Поле не может быть пустым';
                break;
            }
        }*/

        if (hasErrors) {
            this.setState({errors, errorMessages});
        } else {
            Axios.post(
                'http://localhost:3000/orders/new',
                {
                    fullname: this.state.values.fullname,
                    workplace: this.state.values.workplace,
                    size: {
                        _id: this.state.values.size['_id'],
                        name: this.state.values.size['name']
                    },
                }
            ).then((response) => {
                _id = response.data._id
                this.props.addOrder(
                    {
                        ...response.data, _id
                    }
                );
            });

            NotificationContainer.add({
                header: `запись с id ${_id} добавлена`,
            });

            this.setState(_.cloneDeep(initialDataOrderFormState));
        }
    };

    inputCallback = (input) => (value) => {
        this.setState((prevState) => {
            prevState.values[input] = value;
            prevState.errors[input] = undefined;
            prevState.errorMessages[input] = undefined;

            return {
                ...prevState
            }
        })
    };

    onChange = (index: number, value: any) => {
        this.setState((prevState) => {
            prevState.values.size['name'] = value;
            this.props.stock.map((data) => {
                if (data.name === value) {
                    prevState.values.size['_id'] = data._id;
                }
            });

            return {
                ...prevState
            }
        });

        console.log(`Выбран элемент номер ${index} со значением ${value}`);
    }

    componentDidMount() {
        if (_.isEmpty(this.props.stock)) {
            this.props.getStock();
        }
    }

    render() {
        return (
            <div>
                <FormLayout>
                        <RowLayout>
                            <Cell>
                                <TextInput
                                    label='ФИО'
                                    onChange={this.inputCallback('fullname')}
                                    value={this.state.values['fullname']}
                                    error={this.state.errors['fullname']}
                                    errorMessage={this.state.errorMessages['fullname']}
                                />
                            </Cell>
                        </RowLayout>
                        <RowLayout>
                            <Cell>
                                <TextInput
                                    label='Рабочее место'
                                    onChange={this.inputCallback('workplaceId')}
                                    value={this.state.values['workplaceId']}
                                    error={this.state.errors['workplaceId']}
                                    errorMessage={this.state.errorMessages['workplaceId']}
                                />
                            </Cell>
                        </RowLayout>
                        <RowLayout>
                            <Cell>
                                <Select
                                    label='Размер'
                                    onChange={this.onChange}
                                    value={this.state.values.size['name']}
                                >
                                    {this.props.stock.map(({_id, name, total}) => (
                                        <OptionItem key={_id} value={name}>{name} {total} шт</OptionItem>
                                    ))}
                                </Select>
                            </Cell>
                        </RowLayout>
                    <RowLayout>
                        <Cell>
                            <Button onClick={this.handleSave}>Сохранить</Button>
                        </Cell>
                    </RowLayout>
                </FormLayout>
            </div>
        )
    }
}