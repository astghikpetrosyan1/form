/* eslint-disable no-console */
import * as React from 'react';
import moment from 'moment';
import ArrowLeft from '@helsenorge/designsystem-react/components/Icons/ArrowLeft';
import Pause from '@helsenorge/designsystem-react/components/Icons/Pause';
import { CheckBox } from '../checkbox';
import { RadioGroup } from '../radio-group';
import SafeInputField from '../safe-input-field';
import SafeSelect from '../safe-select';
import { SafeTextarea } from '../safe-textarea';
import WrappedComponent from './example/wrapped-component-example';
import Validation from './validation';
import Form, { ButtonType } from '.';
export class FormExample extends React.Component {
    constructor(props) {
        super(props);
        this.inputFieldChangeValidator = (value) => {
            const r = value.length >= 3;
            console.log('inputFieldChangeValidator returns', r);
            return r;
        };
        this.inputFieldOnBlurValidator = (input) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    if (input === 'Sjur' || input === 'LarsK') {
                        console.log('inputFieldOnBlurValidator returns true med verdi', input);
                        resolve(true);
                    }
                    else {
                        console.log('inputFieldOnBlurValidator returns false med verdi', input);
                        resolve(false);
                    }
                }, 1000);
            });
        };
        this.inputFieldChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                inputFieldValue: value,
            });
        };
        this.inputFieldRequiredChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                inputFieldRequiredValue: value,
            });
        };
        this.inputFieldNameChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                inputFieldNameValue: value,
            });
        };
        this.inputFieldDecimalChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                inputFieldDecimalValue: value,
            });
        };
        this.inputFieldNumberChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                inputFieldNumberValue: value,
            });
        };
        this.inputFieldOnBlur = () => {
            const info = console;
            info.log('inputFieldOnBlur');
        };
        this.onTextfieldChange = (event) => {
            const target = event.target;
            const value = target.value;
            this.setState({
                textfieldValue: value,
            });
        };
        this.onSafeselectChange = (evt) => {
            const info = console;
            const value = evt.target.value ? evt.target.value : '-1';
            this.setState({
                safeselect: value,
            });
            info.log('onSafeselectChange', value);
        };
        this.validateTextarea = (value) => {
            if (value.length < 2) {
                return false;
            }
            else if (value.length > 10) {
                return false;
            }
            return true;
        };
        this.getTextareaErrorMessage = (value) => {
            if (value.length < 2) {
                return 'Du må skrive minst to tegn';
            }
            else if (value.length > 10) {
                return 'Du kan ikke skrive mer enn ti tegn';
            }
            return '';
        };
        this.getFornavnErrorMessage = (value) => {
            if (value === '') {
                return 'Du må fylle ut navn';
            }
            if (value.length > 5) {
                return 'Du må skrive mindre enn 5 tegn';
            }
            if (value.length < 3) {
                return 'Du må skrive mer enn 2 tegn';
            }
            return 'Navn må være Sjur eller LarsK';
        };
        this.handleRadioChange = (radioKnapp) => {
            const info = console;
            info.log('Du klikket på radioknappen: ', radioKnapp);
            this.setState({ radioGroupValue: radioKnapp });
        };
        this.handleDisableButtonChange = () => {
            this.setState({ disabled: !this.state.disabled });
        };
        this.onSubmit = () => {
            console.log('form has been submitted');
            this.setState({
                formSubmitted: true,
            });
        };
        this.toggleCheckbox4 = () => {
            this.setState({
                checkbox4Checked: !this.state.checkbox4Checked,
            });
        };
        this.onDraft = () => {
            console.log('form has been saved as draft');
            this.setState({
                formSubmitted: true,
            });
        };
        this.onCancel = () => {
            console.log('form has been canceled');
        };
        this.validateRadioGroup = (value) => {
            return value === 'alt1';
        };
        this.getRadioGroupErrorMessage = () => {
            return 'Du må velge alternativ 1';
        };
        this.isFieldsetValid = () => {
            if (!this.state.formValidated) {
                return true; // only validate fieldset when form has been submitted at least once
            }
            if (this.state.checkbox1Checked || this.state.checkbox2Checked) {
                return true;
            }
            return false;
        };
        this.state = {
            checkbox1Checked: false,
            checkbox2Checked: false,
            checkbox3Checked: false,
            checkbox4Checked: false,
            fieldsetValid: true,
            formSubmitted: false,
            inputFieldValue: '',
            textfieldValue: '',
            safeselect: '',
            datetimeinputValue: undefined,
            datetimepickerDateValue: undefined,
            datetimepickerTimeValue: undefined,
            datepickerValue: undefined,
            daterangepickerValue: undefined,
            disabled: false,
            startDateValue: moment('10.09.2020', 'DD.MM.YYYY'),
            endDateValue: undefined,
            saving: false,
            saved: false,
            radioGroupValue: '',
            formValidated: false,
            inputFieldRequiredValue: '',
            inputFieldNameValue: '',
            inputFieldDecimalValue: '',
            inputFieldNumberValue: '',
        };
    }
    render() {
        const radioOptions = [
            {
                type: 'alt1',
                label: 'Alternativ1',
            },
            {
                type: 'alt2',
                label: 'Alternativ2',
            },
        ];
        return (React.createElement("div", null,
            React.createElement("h3", null, 'Ulike form-komponenter'),
            React.createElement("p", null, '(!) Form validering fungerer slik at imnput-komponenter wrappes i en <Validation>. De clones ved bruk av ref og berikes av valideringsmetoder. En class ref kan ikke sendes videre til en FunctionComponent. Det er derfor kun Class Components som kan wrappes i <Validation> (ikke FunctionComponent)'),
            React.createElement(CheckBox, { label: "Disabled", onChange: this.handleDisableButtonChange, id: "disabledcheckbox", checked: this.state.disabled }),
            React.createElement(Form, { action: "#", submitButtonText: "Send", errorMessage: "Sjekk at alt er riktig utfylt", requiredLabel: "(m\u00E5 fylles ut)", optionalLabel: "(valgfritt)", cancelButtonText: "Avbryt", pauseButtonText: "Fortsett senere", draftButtonText: "Lagre knapp (onDraft)", onDraft: this.onDraft, onPause: () => { }, disabled: this.state.disabled, onCancel: this.onCancel, pauseButtonLevel: "secondary", pauseButtonLeftIcon: Pause, cancelButtonOutline: true, cancelButtonLeftIcon: ArrowLeft, onSubmit: this.onSubmit, validationSummary: {
                    enable: true,
                    header: 'Sjekk at alt er riktig utfylt',
                }, draftButtonTestId: "form-draftbutton", submitButtonTestId: "form-submitbutton", cancelButtonTestId: "form-cancelbutton", pauseButtonTestId: "form-pausebutton", validationTestId: "form-validation", pauseButtonType: "display", submitButtonType: "display", cancelButtonType: "display", buttonOrder: { 1: ButtonType.pauseButton, 2: ButtonType.draftButton, 3: ButtonType.cancelButton, 4: ButtonType.submitButton } },
                React.createElement(WrappedComponent, null),
                React.createElement(SafeInputField, { id: "disabledField", inputName: "disabledField", value: '', showLabel: true, label: "disabled field", disabled: true }),
                React.createElement(Validation, null,
                    React.createElement(SafeInputField, { isRequired: true, id: "formExampleNavn", inputName: "formExampleNavn", value: this.state.inputFieldValue, minLength: 3, onChangeValidator: this.inputFieldChangeValidator, onBlurValidator: this.inputFieldOnBlurValidator, onBlur: this.inputFieldOnBlur, errorMessage: this.getFornavnErrorMessage, showLabel: true, label: "Minlength=3, asynknron onblurvalidator og onchangevalidator", onChange: this.inputFieldChange })),
                React.createElement(Validation, null,
                    React.createElement(SafeInputField, { id: "formExampleDesimaltall", inputName: "formExampleDesimaltall", value: this.state.inputFieldDecimalValue, errorMessage: "Desimaltall m\u00E5 ha f\u00E6rre enn to desimaler", showLabel: true, label: "Desimaltall (maks to desimaler)", type: "number", pattern: "^[0-9]+(.[0-9]{1,2})?$", onChange: this.inputFieldDecimalChange })),
                React.createElement(Validation, null,
                    React.createElement(SafeInputField, { id: "formExampleNumber", inputName: "formExampleNumber", value: this.state.inputFieldNumberValue, errorMessage: "Heltall m\u00E5 v\u00E6re mellom 2 og 5", showLabel: true, max: 5, min: 2, label: "Heltall (min 2 max 5)", type: "number", onChange: this.inputFieldNumberChange })),
                React.createElement(Validation, null,
                    React.createElement(SafeInputField, { id: "formExampleRegex", inputName: "formExampleRegex", value: this.state.inputFieldNameValue, onBlur: this.inputFieldOnBlur, errorMessage: "Etternavn m\u00E5 starte med stor forbokstav", showLabel: true, label: "Etternavn (m\u00E5 starte med stor forbokstav)", onChange: this.inputFieldNameChange, pattern: "^[A-Z][a-z]*" })),
                React.createElement(Validation, null,
                    React.createElement(SafeTextarea, { id: "formTextarea", minlength: 2, value: this.state.textfieldValue ? this.state.textfieldValue : '', isRequired: true, showLabel: true, label: "Hvor har du vondt?", validator: this.validateTextarea, errorMessage: this.getTextareaErrorMessage, onChange: this.onTextfieldChange })),
                React.createElement(Validation, null,
                    React.createElement(SafeSelect, { id: "selectexample", label: "safe-select for \u00E5 teste z-index", selectName: "select-example2", showLabel: true, showLabelLeft: true, options: [
                            new Option('--- Velg ---', '-1'),
                            new Option('Fastlege (0)', '0'),
                            new Option('Flyktig lege (1)', '1'),
                            new Option('Alternativ behandler (2)', '2'),
                        ], onChange: this.onSafeselectChange, selected: this.state.safeselect, errorMessage: (v) => {
                            return `Error: ${v === '-1' ? 'Du må velge noe' : 'Du får ikke lov til å velge Fastlege (0)'}`;
                        }, onChangeValidator: (v) => {
                            const isValid = v !== '-1' && v !== '0';
                            console.log('onChangeValidator isValid', isValid);
                            return isValid;
                        }, requiredLabel: ' (feltet er required)', value: this.state.safeselect, isRequired: true })),
                React.createElement(Validation, null,
                    React.createElement(RadioGroup, { id: "formRadioGroupExample", options: radioOptions, legend: "Hvilket alternativ passer best for deg?", onChange: this.handleRadioChange, selected: this.state.radioGroupValue, validator: this.validateRadioGroup, getErrorMessage: this.getRadioGroupErrorMessage, isRequired: true }))),
            React.createElement("h3", null, 'Form med checkbox og validering'),
            React.createElement(Form, { submitButtonType: "display", action: "#", submitButtonText: 'Opprett digitalt donorkort', errorMessage: '', onSubmit: () => console.log('sendte inn skjema') },
                React.createElement(Validation, null,
                    React.createElement(CheckBox, { label: 'Jeg ønsker å gi bort mine organer og vev for transplantasjon ved min bortgang', onChange: this.toggleCheckbox4, id: "savebuttoncheckbox", checked: this.state.checkbox4Checked, isRequired: true, isStyleBlue: true, errorMessage: 'Du må krysse av for å gå videre' })))));
    }
}
export default FormExample;
//# sourceMappingURL=example.js.map