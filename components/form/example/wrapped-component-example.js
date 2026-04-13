import * as React from 'react';
import SafeInputField from '../../safe-input-field';
import Validation from '../validation';
export default class WrappedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.inputFieldChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                value,
            });
        };
        this.state = {
            value: '',
        };
    }
    render() {
        return (React.createElement(Validation, Object.assign({}, this.props),
            React.createElement(SafeInputField, { id: "input", onChange: this.inputFieldChange, inputName: "lala", value: this.state.value, isRequired: true, label: "N\u00F8stet komponent", showLabel: true })));
    }
}
//# sourceMappingURL=wrapped-component-example.js.map