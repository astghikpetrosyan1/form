import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import './styles.scss';
const ValidationSummary = ({ submitted, components, header }) => {
    if (submitted) {
        const componentsWithErrors = sortComponentsWithErrorsByApperanceInDOM(getComponentsWithErrors(components));
        const listItems = componentsWithErrors.map((el) => {
            let validationMessage;
            if (el.props.label) {
                validationMessage = el.props.label;
            }
            else if (el.props.legend) {
                validationMessage = el.props.legend;
            }
            // In case the validationMessage is a JSX.Element (with possibly an
            // arbitrary DOM structure)
            let elementAsString = validationMessage;
            if (React.isValidElement(validationMessage)) {
                const element = validationMessage;
                elementAsString = ReactDOMServer.renderToStaticMarkup(element);
            }
            const rawText = elementAsString != null ? elementAsString.replace(/<.*?>/g, ' ') : null;
            validationMessage = React.createElement("span", null, rawText);
            const handleScrollToElement = () => {
                const id = `${el.props.id}-wrapper`;
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            };
            return (React.createElement("li", { key: el.props.id, className: "mol_validation-summary__listitem" },
                React.createElement("span", { className: "mol_validation-summary__link", onClick: handleScrollToElement }, validationMessage)));
        });
        if (componentsWithErrors.length) {
            return (React.createElement("div", { className: "mol_validation-summary" },
                React.createElement("h3", { className: "mol_validation-summary__header" }, header),
                React.createElement("ul", { className: "mol_validation-summary__list" }, listItems)));
        }
    }
    return null;
};
function getComponentsWithErrors(components) {
    const componentsWithErrors = components.filter((c) => {
        const componentToValidate = c && c.getWrappedInstance ? c.getWrappedInstance() : c;
        if ((componentToValidate && componentToValidate.props && componentToValidate.props.isValid && !componentToValidate.props.isValid()) ||
            (componentToValidate && componentToValidate.isValid && !componentToValidate.isValid())) {
            return true;
        }
    });
    return componentsWithErrors;
}
function sortComponentsWithErrorsByApperanceInDOM(components) {
    return components.sort((a, b) => {
        const el1 = document.getElementById(`${a.props.id}-wrapper`);
        const el2 = document.getElementById(`${b.props.id}-wrapper`);
        if (el1 && el2) {
            const compare = el1.compareDocumentPosition(el2);
            if (compare === 2) {
                return 1;
            }
            else if (compare === 4) {
                return -1;
            }
        }
        return 0;
    });
}
export default ValidationSummary;
//# sourceMappingURL=index.js.map