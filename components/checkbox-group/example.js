import * as React from 'react';
import CheckBoxGroup from '.';
const info = console;
export class CheckBoxGroupExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: [
                { id: '1', label: 'Dog', checked: false },
                { id: '2', label: 'Cat', checked: false },
                { id: '3', label: 'Fish', checked: false },
                { id: '4', label: 'Platypus', checked: false },
                { id: '5', label: 'Dodo', checked: false, disabled: true },
            ],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onValidated = this.onValidated.bind(this);
    }
    onHandleChange(id) {
        let changed;
        const newCheckboxes = this.state.checkboxes.map(e => {
            if (e.id === id) {
                e.checked = !e.checked;
                changed = e;
            }
            return e;
        });
        if (changed) {
            info.log(`You just ${changed.checked ? 'selected' : 'deselected'} ${changed.label}`);
        }
        this.setState({ checkboxes: newCheckboxes });
    }
    onValidated(isValid) {
        info.log(`I'm ${isValid ? '' : '_not_'} valid!`);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(CheckBoxGroup, { id: "1", legend: React.createElement("strong", null, 'legend: Pick your top two favorite animals'), handleChange: this.onHandleChange, onValidated: this.onValidated, errorMessage: "errorMessage: you can't select more than two animals!", max: 2, checkboxes: this.state.checkboxes, checkboxTestId: "Checkbox", validationTestId: "Validation", checkboxGroupTestId: "CheckboxGroup" })));
    }
}
export default CheckBoxGroupExample;
//# sourceMappingURL=example.js.map