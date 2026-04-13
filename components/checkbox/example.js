import * as React from 'react';
import Button from '@helsenorge/designsystem-react/components/Button';
import { Icon } from '@helsenorge/designsystem-react/components/Icons';
import HelpSign from '@helsenorge/designsystem-react/components/Icons/HelpSign';
import { CheckBox } from '.';
export class CheckboxExample extends React.Component {
    constructor(props) {
        super(props);
        this.handleLillaChange = () => {
            const info = console;
            info.log('Du klikket på lilla checkboxen');
            this.setState({ isLillaChecked: !this.state.isLillaChecked });
        };
        this.handleLongtextChange = () => {
            const info = console;
            info.log('Du klikket på Longtext checkboxen');
            this.setState({ isLongtextChecked: !this.state.isLongtextChecked });
        };
        this.handleBlueChange = () => {
            const info = console;
            info.log('Du klikket på blue checkboxen');
            this.setState({ isBlueChecked: !this.state.isBlueChecked });
        };
        this.handleBoxedChange = () => {
            const info = console;
            info.log('Du klikket på isBox checkboxen');
            this.setState({ isBoxedChecked: !this.state.isBoxedChecked });
        };
        this.handleHjelpetriggerChange = () => {
            const info = console;
            info.log('Du klikket på hjelpetrigger checkboxen');
            this.setState({ isHjelpetriggerChecked: !this.state.isHjelpetriggerChecked });
        };
        this.handleVisHjelp = () => {
            this.setState({ isHjelpVisible: !this.state.isHjelpVisible });
        };
        this.state = {
            isLillaChecked: false,
            isLongtextChecked: false,
            isBlueChecked: false,
            isBoxedChecked: false,
            isHjelpetriggerChecked: false,
            isHjelpVisible: false,
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(CheckBox, { label: "CheckBox lilla", onChange: this.handleLillaChange, id: "referralFilterLillaCheckBox", checked: this.state.isLillaChecked, checkboxTestId: "Checkbox", labelTestId: "Label", validationTestId: "Validation" }),
            React.createElement(CheckBox, { label: "CheckBox with a very very long label. Lorem ipsum dolor sit amet consctur lorem ipsum dolor sit amet consctur lorem ipsum dolor sit amet consctur lorem ipsum dolor sit amet consctur l", onChange: this.handleLongtextChange, id: "referralFilterLongtextCheckBox", checked: this.state.isLongtextChecked }),
            React.createElement(CheckBox, { label: "CheckBox blue", isStyleBlue: true, onChange: this.handleBlueChange, id: "referralFilterBlueCheckBox", checked: this.state.isBlueChecked }),
            React.createElement(CheckBox, { label: "CheckBox isBoxed", isStyleBoxed: true, onChange: this.handleBoxedChange, id: "referralFilterBoxCheckBox", checked: this.state.isBoxedChecked }),
            React.createElement(CheckBox, { label: "Disabled checkbox", onChange: () => {
                    return null;
                }, id: "referralFilterCheckBox2", disabled: true }),
            React.createElement(CheckBox, { label: "Checked disabled checkbox", onChange: () => {
                    return null;
                }, id: "referralFilterCheckBox3", disabled: true, checked: true }),
            React.createElement(CheckBox, { label: "CheckBox med hjelpetrigger og comment", onChange: this.handleHjelpetriggerChange, id: "referralFilterHjelpetriggerCheckBox", checked: this.state.isHjelpetriggerChecked, comment: "Dette er en kommentar", helpButton: React.createElement(Button, { ariaLabel: 'Vis hjelp eksempel', variant: "borderless", onClick: this.handleVisHjelp }, React.createElement(Icon, { color: 'black', svgIcon: HelpSign })), helpElement: this.state.isHjelpVisible ? React.createElement("div", null, `Dette er en hjelpetekst`) : undefined })));
    }
}
export default CheckboxExample;
//# sourceMappingURL=example.js.map