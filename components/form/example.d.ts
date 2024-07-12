import * as React from 'react';
import moment, { Moment } from 'moment';
interface ExampleState {
    checkbox1Checked?: boolean;
    checkbox2Checked?: boolean;
    checkbox3Checked?: boolean;
    checkbox4Checked?: boolean;
    fieldsetValid?: boolean;
    formSubmitted?: boolean;
    inputFieldValue: string;
    textfieldValue: string;
    safeselect: string;
    datetimeinputValue: Date | undefined;
    datetimepickerDateValue: moment.Moment | undefined;
    datetimepickerTimeValue: string | undefined;
    datepickerValue: Date | undefined;
    daterangepickerValue: Moment | undefined;
    disabled: boolean;
    startDateValue: Moment | undefined;
    endDateValue: Moment | undefined;
    saving: boolean;
    saved: boolean;
    radioGroupValue: string;
    formValidated: boolean;
    inputFieldRequiredValue: string;
    inputFieldNameValue: string;
    inputFieldDecimalValue: string;
    inputFieldNumberValue: string;
}
export declare class FormExample extends React.Component<{}, ExampleState> {
    constructor(props: {});
    inputFieldChangeValidator: (value: string) => boolean;
    inputFieldOnBlurValidator: (input: string | number) => Promise<boolean>;
    inputFieldChange: (event: React.FormEvent<{}>) => void;
    inputFieldRequiredChange: (event: React.FormEvent<{}>) => void;
    inputFieldNameChange: (event: React.FormEvent<{}>) => void;
    inputFieldDecimalChange: (event: React.FormEvent<{}>) => void;
    inputFieldNumberChange: (event: React.FormEvent<{}>) => void;
    inputFieldOnBlur: () => void;
    onTextfieldChange: (event: React.FormEvent<{}>) => void;
    onSafeselectChange: (evt: React.MouseEvent) => void;
    validateTextarea: (value: string) => boolean;
    getTextareaErrorMessage: (value: string) => string;
    getFornavnErrorMessage: (value: string) => string;
    handleRadioChange: (radioKnapp: string) => void;
    handleDisableButtonChange: () => void;
    onSubmit: () => void;
    toggleCheckbox4: () => void;
    onDraft: () => void;
    onCancel: () => void;
    validateRadioGroup: (value: string) => boolean;
    getRadioGroupErrorMessage: () => string;
    isFieldsetValid: () => boolean;
    render(): JSX.Element;
}
export default FormExample;
//# sourceMappingURL=example.d.ts.map