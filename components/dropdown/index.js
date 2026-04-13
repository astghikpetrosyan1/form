import { __awaiter } from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import Icon from '@helsenorge/designsystem-react/components/Icons';
import ChevronDown from '@helsenorge/designsystem-react/components/Icons/ChevronDown';
import ChevronRight from '@helsenorge/designsystem-react/components/Icons/ChevronRight';
import ChevronUp from '@helsenorge/designsystem-react/components/Icons/ChevronUp';
import { theme } from '@helsenorge/designsystem-react';
import ValidationError from '../form/validation-error';
import { Label } from '../label';
import './styles.scss';
export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.getChildValidation = (child) => {
            return child.validateField().then(() => {
                return child.isValid();
            });
        };
        // Denne funksjonen blir kalt på submit i form
        // Check wether or not children are valid and sets state accordingly
        this.validateField = () => __awaiter(this, void 0, void 0, function* () {
            if (this.props.childrenToValidate) {
                const childrenValidityPromises = this.props.childrenToValidate.map((childRef) => __awaiter(this, void 0, void 0, function* () {
                    return childRef.current ? this.getChildValidation(childRef.current) : false;
                }));
                const childrenValidity = yield Promise.all(childrenValidityPromises);
                const isValid = childrenValidity.every(v => v === true);
                return new Promise((resolve) => {
                    this.setState({
                        isValid,
                        validated: true,
                    }, () => {
                        this.notifyValidated();
                        resolve();
                    });
                });
            }
        });
        // Used with <Validation>
        this.notifyValidated = () => {
            if (this.props.onValidated) {
                this.props.onValidated(this.state.isValid);
            }
        };
        // Used with <Validation>
        this.isValid = () => {
            return this.state.isValid;
        };
        // Used with <Validation>
        this.renderErrorMessage = () => {
            if (this.props.validationErrorRenderer && !this.state.isValid) {
                return this.props.validationErrorRenderer;
            }
            let error;
            if (this.props.errorMessage) {
                error = this.props.errorMessage;
            }
            else {
                error = 'Ugyldig verdi';
            }
            return React.createElement(ValidationError, { isValid: this.state.isValid, error: error, testId: this.props.validationTestId });
        };
        this.renderLabel = () => {
            const { name, isRequired, requiredLabel, optionalLabel, showRequiredLabel, showOptionalLabel } = this.props;
            const labelText = (React.createElement(React.Fragment, null,
                name,
                isRequired && requiredLabel && showRequiredLabel ? React.createElement("em", null,
                    " ",
                    requiredLabel) : '',
                !isRequired && optionalLabel && showOptionalLabel ? React.createElement("em", null,
                    " ",
                    optionalLabel) : ''));
            return React.createElement(Label, { labelText: labelText, isNotBold: true });
        };
        this.clickListener = (evt) => {
            const target = evt.target;
            if (this.dropdownRef.current &&
                !this.dropdownRef.current.contains(target) &&
                !target.classList.contains('mol_dropdown__button') &&
                !target.classList.contains('CalendarDay')) {
                this.toggleDropdown();
            }
        };
        this.addClickListener = () => {
            document.addEventListener('click', this.clickListener);
        };
        this.removeClickListener = () => {
            document.removeEventListener('click', this.clickListener);
        };
        this.toggleDropdown = () => {
            this.props.toggleDropdown(this.props.index);
        };
        this.onFocus = () => {
            this.setState({ focus: true });
        };
        this.onBlur = () => {
            this.setState({ focus: false });
        };
        this.buttonRef = React.createRef();
        this.dropdownRef = React.createRef();
        this.state = {
            focus: false,
            isValid: true,
            value: undefined,
            validated: false,
        };
    }
    componentDidMount() {
        if (this.props.open) {
            this.addClickListener();
        }
        if (this.props.respectContent && this.buttonRef.current) {
            const width = this.buttonRef.current.offsetWidth + 15;
            this.buttonRef.current.style.width = `${width}px`;
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // Used in combination with componentDidUpdate to trigger validation when the nested value is changed
        if (nextProps.value !== prevState.value) {
            return Object.assign({ value: nextProps.value }, prevState);
        }
        return null;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.validateField();
        }
        if (!prevProps.open && this.props.open) {
            this.addClickListener();
        }
        else if (prevProps.open && !this.props.open) {
            this.removeClickListener();
        }
    }
    componentWillUnmount() {
        this.removeClickListener();
    }
    render() {
        const { open, icon, children, className, respectContent, isFullWidth, arrowRight } = this.props;
        const { validated, isValid, focus } = this.state;
        const dropdownClasses = classNames({
            mol_dropdown: true,
            mol_validation: true,
            'mol_validation--active': validated && !isValid,
            'mol_dropdown--open': open,
            'mol_dropdown--focused': focus,
            'mol_dropdown--full-width': isFullWidth,
        }, className);
        const dropdownButtonClasses = classNames({
            mol_dropdown__button: true,
            'mol_dropdown__button--selected': open,
            'mol_dropdown__button--full-width': isFullWidth || respectContent,
        });
        const dropdownContentClasses = classNames({
            mol_dropdown__content: true,
            'mol_dropdown__content--open': open,
            'mol_dropdown__content--focused': this.state.focus,
        });
        const joinedName = this.props.name ? this.props.name.replace(' ', '_') : '';
        return (React.createElement("div", { className: dropdownClasses, ref: this.dropdownRef },
            this.renderErrorMessage(),
            React.createElement("button", { type: "button", onClick: this.toggleDropdown, className: dropdownButtonClasses, ref: this.buttonRef, "aria-expanded": open, "aria-controls": joinedName, "data-testid": this.props.buttonTestId, onFocus: this.onFocus, onBlur: this.onBlur },
                icon,
                React.createElement("span", { className: 'mol_dropdown__button-text' }, this.renderLabel()),
                arrowRight ? (React.createElement(Icon, { color: theme.palette.blueberry500, svgIcon: ChevronRight, className: 'mol_dropdown__button-arrow mol_dropdown__button-arrow--right' })) : open ? (React.createElement(Icon, { color: theme.palette.blueberry500, svgIcon: ChevronUp, className: 'mol_dropdown__button-arrow mol_dropdown__button-arrow--up' })) : (React.createElement(Icon, { color: theme.palette.blueberry500, svgIcon: ChevronDown, className: 'mol_dropdown__button-arrow mol_dropdown__button-arrow--down' }))),
            React.createElement("div", { className: 'mol_dropdown__container', id: joinedName },
                React.createElement("div", { className: dropdownContentClasses }, children))));
    }
}
//# sourceMappingURL=index.js.map