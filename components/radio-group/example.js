import * as React from 'react';
import { RadioGroup } from '.';
export class RadioGroupExample extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (value) => {
            this.setState({
                selected: value,
            });
            console.log('Du klikket på radioknappen: ', value);
        };
        this.state = {
            selected: 'alt3',
        };
    }
    render() {
        const radioOptions = [
            {
                type: 'alt1',
                label: 'Alternativ 1',
            },
            {
                type: 'alt2',
                label: 'Alternativ 2 med en utrolig lang label tekst. Lorem ipsum ddolor sit amet consectur Lorem ipsum ddolor sit amet consectur Lorem ipsum ddolor sit amet consectur',
            },
            {
                type: 'alt3',
                label: 'Alternativ 3, deaktivert',
                disabled: true,
            },
        ];
        return (React.createElement(RadioGroup, { id: "example", options: radioOptions, onChange: this.handleChange, selected: this.state.selected, legend: "Hvilket alternativ vil du ha?", testId: "RadioGroup" }));
    }
}
export default RadioGroupExample;
//# sourceMappingURL=example.js.map