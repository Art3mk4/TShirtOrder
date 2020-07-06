import * as React from 'react';
import * as _ from 'lodash';
import {
    Button,
    Cell, ErrorType,
    FormLayout,
    NotificationContainer,
    NumberInput,
    RowLayout,
    TextInput,
} from "ufs-ui";

import { generateId } from '../../utils';

import * as I from './IDataForm';

interface Field {
    id: string;
    label: string;
    Component: React.ComponentClass<any>
}

const fields: Field[] = [
    {
        id: 'inn',
        label: 'ИНН',
        Component: NumberInput,
    },
    {
        id: 'kpp',
        label: 'КПП',
        Component: NumberInput,
    },
    {
        id: 'name',
        label: 'Наименование клиента',
        Component: TextInput,
    },
    {
        id: 'sum',
        label: 'Сумма',
        Component: NumberInput,
    }
];

const initialDataFormValues = {
    inn: undefined,
    kpp: undefined,
    name: undefined,
    sum: undefined
};

const initialDataFormState: I.State = {
    values: { ...initialDataFormValues },
    errors: { ...initialDataFormValues },
    errorMessages: { ...initialDataFormValues }
};

export default class DataFormPL extends React.Component<I.OwnProps & I.StateProps & I.DispatchProps, I.State> {
    static displayName = 'DataForm';

    state: I.State = _.cloneDeep(initialDataFormState);

    handleSave = () => {
        const id = generateId();
        const errors: I.State['errors'] = { ...initialDataFormValues };
        const errorMessages: I.State['errorMessages'] = { ...initialDataFormValues };
        let hasErrors = false;

        for (let input in this.state.values) {
            if (this.state.values[input] === null || this.state.values[input] === undefined) {
                hasErrors = true;
                errors[input] = ErrorType.ERROR;
                errorMessages[input] = 'Поле не может быть пустым';
                break;
            }
        }

        if (hasErrors) {
            this.setState({ errors, errorMessages });
        } else {

            this.props.addRecord(
                {
                    ...this.state.values, id
                }
            );

            NotificationContainer.add({
                header: `запись с id ${id} добавлена`,
            });

            this.setState(_.cloneDeep(initialDataFormState));
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

    render() {
        return (
            <div>
                <FormLayout>
                    {fields.map(({ Component, label, id }) => (
                        <RowLayout key={id}>
                            <Cell>
                                <Component
                                    label={label}
                                    onChange={this.inputCallback(id)}
                                    value={this.state.values[id]}
                                    error={this.state.errors[id]}
                                    errorMessage={this.state.errorMessages[id]}
                                />
                            </Cell>
                        </RowLayout>
                    ))}
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
