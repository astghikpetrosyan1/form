import * as React from 'react';
import { Label } from '.';
export const LabelExample = () => {
    return (React.createElement("div", null,
        React.createElement("p", null, '-> Label med text og children'),
        React.createElement(Label, { labelText: "This is my label as a string ", htmlFor: 'my-field-id1', testId: "Label" }, 'And its nested child'),
        React.createElement("p", null,
            React.createElement("br", null)),
        React.createElement("p", null, '-> Label med enriched text og sublabel'),
        React.createElement(Label, { labelText: React.createElement(React.Fragment, null,
                'This is my enriched label ',
                React.createElement("em", null, '(With some optional info)')), sublabelText: 'And my sublabel', htmlFor: 'my-field-id2' })));
};
export default LabelExample;
//# sourceMappingURL=example.js.map