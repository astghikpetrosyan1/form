import * as React from 'react';
import Icon, { IconSize } from '@helsenorge/designsystem-react/components/Icons';
import Rocket from '@helsenorge/designsystem-react/components/Icons/Rocket';
import CheckBoxGroup from '../checkbox-group';
import Form from '../form';
import { Validation } from '../form/validation';
import SafeInputField from '../safe-input-field';
import { Dropdown } from '.';
export class DropdownExample extends React.Component {
    constructor(props) {
        super(props);
        this.toggleOpen = (index) => {
            if (index === 0) {
                this.setState({ dropdown0: !this.state.dropdown0 });
            }
            else if (index === 1) {
                this.setState({ dropdown1: !this.state.dropdown1 });
            }
            else if (index === 2) {
                this.setState({ dropdown2: !this.state.dropdown2 });
            }
            else if (index === 3) {
                this.setState({ dropdown3: !this.state.dropdown3 });
            }
            else if (index === 4) {
                this.setState({ dropdown4: !this.state.dropdown4 });
            }
            else if (index === 5) {
                this.setState({ dropdown5: !this.state.dropdown5 });
            }
        };
        this.updateDropdown4Value = (index, value) => {
            // Here you can have whatever busniess logic you want. The aim is just have a state which we can check for changes
            // This is what triggers validation
            const stateToObj = this.state.dropdown4Value ? JSON.parse(this.state.dropdown4Value) : {};
            const dropdownObj = Object.assign(Object.assign({}, stateToObj), { [index]: value });
            const dropdown4Value = JSON.stringify(dropdownObj);
            this.setState({ dropdown4Value });
        };
        this.updateDropdown5Value = () => {
            // Here you can have whatever busniess logic you want. The aim is just have a state which we can check for changes.
            // This is what triggers validation
            const dropdown5Value = JSON.stringify(this.state.checkboxes);
            this.setState({ dropdown5Value });
        };
        this.updateCheckboxValue = (id) => {
            const newCheckboxes = this.state.checkboxes.map(e => {
                if (e.id === id) {
                    e.checked = !e.checked;
                }
                return e;
            });
            this.setState({ checkboxes: newCheckboxes }, () => {
                this.updateDropdown5Value();
            });
        };
        this.inputfieldInDropdownRef1 = React.createRef();
        this.inputfieldInDropdownRef2 = React.createRef();
        this.checkboxInDropdownRef = React.createRef();
        this.state = {
            dropdown0: false,
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
            dropdown4: false,
            dropdown5: false,
            dropdown4Value: undefined,
            dropdown5Value: undefined,
            inputValue1: '',
            inputValue2: '',
            inputValue3: '',
            checkboxes: [
                { id: '1', label: 'Bil', checked: false },
                { id: '2', label: 'Drosje', checked: false },
                { id: '3', label: 'Båt', checked: false },
            ],
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h3", null, 'Respekter bredde på knapp (default)'),
            React.createElement(Dropdown, { name: "Dropdown 0", toggleDropdown: this.toggleOpen, index: 0, open: this.state.dropdown0, buttonTestId: "DropdownBtn", validationTestId: "DropdownValidation" }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, eros ut convallis commodo, ligula magna euismod dui, ut lobortis tellus magna eu metus.'),
            React.createElement("h3", null, 'Respekter bredde på innhold respectContent=true'),
            React.createElement(Dropdown, { name: "Dropdown 1", toggleDropdown: this.toggleOpen, index: 1, open: this.state.dropdown1, respectContent: true }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, eros ut convallis commodo!'),
            React.createElement("h3", null, 'Bruk isFullWidth +  ikon'),
            React.createElement(Dropdown, { name: "Dropdown 2", icon: React.createElement(Icon, { svgIcon: Rocket, size: IconSize.Small }), toggleDropdown: this.toggleOpen, index: 2, open: this.state.dropdown2, isFullWidth: true }, 'Lorem ipsum dolor sit amet!'),
            React.createElement("h3", null, 'Bruk av lang label + ikon med custom height'),
            React.createElement(Dropdown, { name: "Dropdown 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, eros ut convallis commodo! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, eros ut convallis commodo! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, eros ut convallis commodo!", icon: React.createElement(Icon, { svgIcon: Rocket, size: 128 }), toggleDropdown: this.toggleOpen, index: 3, open: this.state.dropdown3 }, 'Lorem ipsum dolor sit amet!'),
            React.createElement("hr", null),
            React.createElement("h3", null, 'Dropdown som en del av en <Form> med <Validation>'),
            React.createElement(Form, { action: "#", submitButtonText: "Send", errorMessage: "Sjekk at alt er riktig utfylt", requiredLabel: ' *', showRequiredLabel: true, optionalLabel: "(valgfritt)", allowChildPropOverride: true, onSubmit: () => {
                    console.log('SUBMITTING');
                } },
                React.createElement(Validation, null,
                    React.createElement(SafeInputField, { label: "TestInputDropdown1", inputName: "TestInputDropdown1", value: this.state.inputValue1, showLabel: true, requiredLabel: 'Overwritten required text', requiredErrorMessage: 'Feltet er required', minLength: 3, onValidated: (v) => {
                            console.log('SafeInputFielkd 1 onValidated: ', v ? 'TRUE' : 'FALSE');
                        }, errorMessage: (v) => `Error: ${v}`, onChange: (event) => {
                            this.setState({
                                inputValue1: event.target.value,
                            });
                        }, isRequired: true })),
                React.createElement(Validation, null,
                    React.createElement(Dropdown, { name: "This is my custom content Dropdown. Den inneholder input som skal valideres:", toggleDropdown: this.toggleOpen, index: 4, open: this.state.dropdown4, childrenToValidate: [this.inputfieldInDropdownRef1, this.inputfieldInDropdownRef2], errorMessage: "Custom errorMessage: noe er ikke fylt ut riktig", value: this.state.dropdown4Value, isFullWidth: true },
                        React.createElement(SafeInputField, { ref: this.inputfieldInDropdownRef1, label: "TestInputDropdown2", inputName: "TestInputDropdown2", value: this.state.inputValue2, showLabel: true, requiredLabel: 'Overwritten required text', requiredErrorMessage: 'Feltet er required', minLength: 3, errorMessage: (v) => `Error: ${v}`, onChange: (event) => {
                                const value = event.target.value;
                                this.setState({
                                    inputValue2: value,
                                }, () => {
                                    this.updateDropdown4Value(0, value);
                                });
                            }, isRequired: true }),
                        React.createElement(SafeInputField, { ref: this.inputfieldInDropdownRef2, label: "TestInputDropdown3", inputName: "TestInputDropdown3", value: this.state.inputValue3, showLabel: true, requiredLabel: 'Overwritten required text', requiredErrorMessage: 'Feltet er required', minLength: 3, errorMessage: (v) => `Error: ${v}`, onChange: (event) => {
                                const value = event.target.value;
                                this.setState({
                                    inputValue3: value,
                                }, () => {
                                    this.updateDropdown4Value(1, value);
                                });
                            }, isRequired: true })))),
            React.createElement("hr", null),
            React.createElement("h3", null, 'Dropdown med enestående komponent med <Validation>'),
            React.createElement(Dropdown, { name: "Velg transport (et eksempel med CheckboxGroup / List)", toggleDropdown: this.toggleOpen, index: 5, open: this.state.dropdown5, childrenToValidate: [this.checkboxInDropdownRef], errorMessage: "Custom errorMessage: noe er ikke fylt ut riktig", value: this.state.dropdown5Value, isFullWidth: true },
                React.createElement(CheckBoxGroup, { id: "dropdowncheckbox1", ref: this.checkboxInDropdownRef, handleChange: this.updateCheckboxValue, errorMessage: "Custom errorMessage: Du m\u00E5 velge min \u00E9n transport og maks to", min: 1, max: 2, checkboxes: this.state.checkboxes, isRequired: true })),
            React.createElement("p", null,
                React.createElement("br", null))));
    }
}
export default DropdownExample;
//# sourceMappingURL=example.js.map