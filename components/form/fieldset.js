/*  This file has been converted to TypeScript
 When making changes to this file please make them
 in the file with a .ts or .tsx extension located in
 the Common/src/toolkit folder structure
 Then run the command "npm run build-toolkit" to generate the jsx file
 Please check both files into TFS */
import * as React from 'react';
import ValidationError from './validation-error';
class Fieldset extends React.Component {
    constructor() {
        super(...arguments);
        this.notifyValidated = (valid) => {
            if (this.props.onValidated) {
                this.props.onValidated(valid);
            }
        };
    }
    renderErrorMessage() {
        let error;
        if (this.props.errorMessage) {
            error = typeof this.props.errorMessage === 'string' ? this.props.errorMessage : this.props.errorMessage(this.props.isValid());
        }
        else {
            error = 'Ugyldig verdi';
        }
        return React.createElement(ValidationError, { isValid: this.props.isValid(), error: error });
    }
    render() {
        let wrapperClasses = 'mol_validation';
        if (!this.props.isValid()) {
            wrapperClasses += ' mol_validation--active';
        }
        if (this.props.className) {
            wrapperClasses += ` ${this.props.className}`;
        }
        return (React.createElement("div", { className: wrapperClasses },
            this.renderErrorMessage(),
            React.createElement("fieldset", null,
                React.createElement("legend", null, this.props.legendText),
                this.props.children)));
    }
}
Fieldset.hnFormComponent = true;
export default Fieldset;
//# sourceMappingURL=fieldset.js.map