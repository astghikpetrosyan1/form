import * as React from 'react';
import { isValid } from '@helsenorge/core-utils/string-utils';
import { debounce } from '@helsenorge/core-utils/debounce';
import { RadioGroup } from '../radio-group';
import { SafeTextarea } from '.';
const radioOptionsSize = [
    { type: 'small', label: 'Small' },
    { type: 'medium', label: 'Medium' },
    { type: 'large', label: 'Large' },
    { type: 'maxlength', label: 'La maxlength bestemme' },
];
export class SafeTextareaExample extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            const value = event.target.value;
            this.setState({ questionnaireValue: { valueString: value } });
        };
        this.debouncedHandleChange = debounce(this.handleChange, 250, false);
        this.notifyValidated = (isValid) => {
            this.setState({
                isValid,
            });
        };
        this.state = { isValid: false, value: '', size: 'medium', showmax: false, maxLength: 100, questionnaireValue: { valueString: '' } };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleMaxLengthChange = this.handleMaxLengthChange.bind(this);
        this.debouncedHandleChange = this.debouncedHandleChange.bind(this);
    }
    onBlur() {
        const info = console;
        info.log('textarea har mistet fokus');
    }
    getStringValue(answer) {
        if (answer && answer.valueString) {
            return answer.valueString;
        }
        return '';
    }
    onChange(event) {
        const info = console;
        info.log('textarea har endret innhold', event);
    }
    onFocus() {
        const info = console;
        info.log('textarea har fått fokus');
    }
    handleRadioChange(radioknapp) {
        if (radioknapp === 'maxlength') {
            this.setState({ size: radioknapp, showmax: true });
        }
        else {
            this.setState({ size: radioknapp, showmax: false });
        }
    }
    handleMaxLengthChange(e) {
        const target = e.target;
        const value = parseInt(target.value, 10);
        this.setState({ maxLength: value });
    }
    render() {
        const maxlength = (React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" },
            React.createElement("label", { htmlFor: "maxlengthtextarea" }, 'Maks lengde'),
            React.createElement("input", { className: "atom_input--small ", id: "maxlengthtextarea", type: "number", value: this.state.maxLength, onChange: this.handleMaxLengthChange })));
        const setup = (React.createElement("div", null,
            React.createElement(RadioGroup, { id: "safetextareasize", legend: "St\u00F8rrelse", options: radioOptionsSize, onChange: this.handleRadioChange, selected: this.state.size }),
            this.state.showmax ? maxlength : null));
        return (React.createElement(React.Fragment, null,
            setup,
            React.createElement(SafeTextarea, { size: this.state.size !== 'maxlength' ? this.state.size : undefined, id: "exampleTextarea", counter: this.state.maxLength ? true : false, maxlength: this.state.size === 'maxlength' ? this.state.maxLength : undefined, disabled: false, autoFocus: false, value: "default verdi", placeholder: "Skriv noe her", onFocus: this.onFocus, onChange: this.onChange, onBlur: this.onBlur, validator: isValid, testId: "SafeTextArea" }),
            React.createElement("br", null),
            React.createElement(SafeTextarea, { id: "exampleTextarea2", label: 'SafeTextarea med validering: minlength 5 og maxlength 10', showLabel: true, size: undefined, minlength: 5, maxlength: 10, disabled: false, autoFocus: false, value: this.state.value, placeholder: "Skriv noe her", isRequired: true, onChange: (event) => {
                    this.setState({ value: event.target.value });
                }, errorMessage: (v) => `Error:  Denne verdien '${v}' er ikke gyldig`, onValidated: this.notifyValidated, requiredLabel: ' (feltet er required)' }),
            React.createElement(SafeTextarea, { id: 'test-id', rows: 3, value: this.getStringValue(this.state.questionnaireValue), isRequired: true, showLabel: true, label: 'Label', subLabel: 'Sublabel', placeholder: 'min egen placeholder v2', maxlength: 1000, minlength: 1, counter: true, onChange: (event) => {
                    event.persist();
                    this.debouncedHandleChange(event);
                }, errorMessage: 'error', validateOnExternalUpdate: true }),
            React.createElement("button", { onClick: () => this.setState({ questionnaireValue: { valueString: 'TEST' } }) }, "Sett inn 'TEST'"),
            React.createElement("button", { onClick: () => this.setState({ questionnaireValue: { valueString: '' } }) }, "Sett inn tom string")));
    }
}
export default SafeTextareaExample;
//# sourceMappingURL=example.js.map