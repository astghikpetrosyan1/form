import * as React from 'react';
import SafeSelect from '.';
export class SafeSelectExample extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (evt) => {
            const selected = evt.target.value ? evt.target.value : '-1';
            console.log('onChange called setSelected', selected);
            this.setState({
                selected,
            });
        };
        this.notifyValidated = (isValid) => {
            this.setState({
                isValid,
            });
        };
        this.state = {
            selected: '',
            isValid: false,
        };
    }
    render() {
        const options = [
            new Option('--- Velg ---', '-1'),
            new Option('Fastlege (0)', '0'),
            new Option('Flyktig lege (1)', '1'),
            new Option('Alternativ behandler (2)', '2'),
        ];
        return (React.createElement(React.Fragment, null,
            React.createElement(SafeSelect, { id: "selectexample", label: "Velg et eller et annet", selectName: "select-example", showLabel: true, options: options, onChange: this.onChange, selected: this.state.selected, errorMessage: (v) => {
                    return `Error: ${v === '-1' ? 'Du må velge noe' : 'Du får ikke lov til å velge Fastlege (0)'}`;
                }, onChangeValidator: (v) => {
                    const isValid = v !== '-1' && v !== '0';
                    console.log('onChangeValidator isValid', isValid);
                    return isValid;
                }, onValidated: this.notifyValidated, requiredLabel: ' (feltet er required)', value: this.state.selected, isRequired: true, selectTestId: "SafeSelect", validationTestId: "Validation", labelTestId: "Label" }),
            React.createElement("p", null, `Verdi som er valgt er ${this.state.selected} og feltet ${this.state.isValid ? 'er validert riktig' : 'er IKKE validert riktig'} `),
            React.createElement("p", null,
                React.createElement("br", null)),
            React.createElement(SafeSelect, { id: "selectexample", label: "Eksempel med showLabelLeft", selectName: "select-example2", showLabel: true, showLabelLeft: true, options: options, onChange: this.onChange, selected: this.state.selected, errorMessage: (v) => {
                    return `Error: ${v === '-1' ? 'Du må velge noe' : 'Du får ikke lov til å velge Fastlege (0)'}`;
                }, onChangeValidator: (v) => {
                    const isValid = v !== '-1' && v !== '0';
                    console.log('onChangeValidator isValid', isValid);
                    return isValid;
                }, onValidated: this.notifyValidated, requiredLabel: ' (feltet er required)', value: this.state.selected, isRequired: true })));
    }
}
export default SafeSelectExample;
//# sourceMappingURL=example.js.map