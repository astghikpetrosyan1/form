import * as React from 'react';
import { SvgIcon } from '@helsenorge/designsystem-react/components/Icons';
import ValidationSummary from './validation-summary';
import { ValidationSummaryPlacement } from './validationSummaryPlacement';
import './styles.scss';
interface ValidationSummary {
    enable: boolean;
    header: string;
}
export declare enum ButtonType {
    submitButton = "submitButton",
    draftButton = "draftButton",
    cancelButton = "cancelButton",
    pauseButton = "pauseButton"
}
interface ButtonOrder {
    1: ButtonType;
    2: ButtonType;
    3: ButtonType;
    4: ButtonType;
}
export interface FormProps {
    action: string;
    /** Ekstra CSS-class som legges på form'en */
    className?: string;
    /** Om Formen er disabled (submit knapp)*/
    disabled?: boolean;
    /** The CSS classes to be added to the content of the form upon the buttons */
    contentClasses?: string;
    /** Ekstra CSS-class som brukes på button-wrapper'en */
    buttonClasses?: string;
    /** Teksten som vises på submit knappen */
    submitButtonText?: string;
    /** Ekstra CSS-class som legges på submit knappen */
    submitButtonClasses?: string;
    /** Submit button type. Default is 'action' */
    submitButtonType?: 'action' | 'display';
    /** If the submit button has an icon to be shown on the left - only possible if submitButtonType is 'display' */
    submitButtonLeftIcon?: boolean;
    /** If the submit button has an icon to be shown on the right - only possible if submitButtonType is 'display'  */
    submitButtonRightIcon?: boolean;
    /** If the submit button is disabled  */
    submitButtonDisabled?: boolean;
    /** The text to be shown on the cancel button */
    cancelButtonText?: string;
    /** The CSS classes to be added to the cancelbutton */
    cancelButtonClasses?: string;
    /** Option to give order of how the buttons should be placed */
    buttonOrder?: ButtonOrder;
    /** Cancel button type. Default is 'action' */
    cancelButtonType?: 'action' | 'display';
    /** If the cancel button has an icon to be shown on the left - only possible if cancelButtonType is 'display' */
    cancelButtonLeftIcon?: SvgIcon;
    /** If the cancel button is disabled  */
    cancelButtonDisabled?: boolean;
    /** Setter outline variant på CancelButton */
    cancelButtonOutline?: boolean;
    /** Teksten som vises på lagre knappen */
    draftButtonText?: string;
    /** Ekstra CSS-class som legges på lagre knappen */
    draftButtonClasses?: string;
    /** Teksten som vises på pause knappen */
    pauseButtonText?: string;
    /** Ekstra CSS-class som legges på pause knappen */
    pauseButtonClasses?: string;
    /** Whether the pause button should be displayed to the left */
    pauseButtonLeft?: boolean;
    /** Pause button type. Default is 'action' */
    pauseButtonType?: 'action' | 'display' | 'function';
    /** If the pause button is a primary, secondary or tertiary button */
    pauseButtonLevel?: 'primary' | 'secondary' | 'tertiary';
    /** If the pause button has an icon to be shown on the left - only possible if submitButtonType is 'display'  */
    pauseButtonLeftIcon?: SvgIcon;
    /** If the pause button is disabled  */
    pauseButtonDisabled?: boolean;
    /** Feilmeldingen som vises ved Error */
    errorMessage?: string;
    /** Custom validator function which will be called before submit function*/
    submitValidator?: () => Promise<void>;
    /** Function som kalles ved Submit */
    onSubmit?: (event?: React.FormEvent<{}>) => void;
    /** Function som kalles ved lagring */
    onDraft?: (event?: React.FormEvent<{}>) => void;
    /** Function som kalles ved klikk på Avrbyt */
    onCancel?: (event?: React.FormEvent<{}>) => void;
    /** Function som kalles ved pause */
    onPause?: () => void;
    /** Gjør det mulig å overskrive optionalLabel, requiredLabel, showOptionalLabel og showRequired Label + bruke custom notifyValidated på komponent'en i en form */
    allowChildPropOverride?: boolean;
    /** Teksten til required label */
    requiredLabel?: string;
    /** Teksten til optional label */
    optionalLabel?: string;
    /** Om required label skal vises eller ikke */
    showRequiredLabel?: boolean;
    /** Om ekstra label skal vises eller ikke */
    showOptionalLabel?: boolean;
    /** Om det legges et preventDefault lag på submit */
    triggerPreventDefaultOnSubmit?: boolean;
    /** Selve ValidationSummary kompomnent som oppsumerer alle valideringsfeilene */
    validationSummary?: ValidationSummary;
    /** Plasseringen til ValidationSummary */
    validationSummaryPlacement?: ValidationSummaryPlacement;
    /** Innhold som vises i formen */
    children?: React.ReactNode;
    /** Id som benyttes for å hente ut DraftButton i automatiske tester */
    draftButtonTestId?: string;
    /** Id som benyttes for å hente ut SubmitButton i automatiske tester */
    submitButtonTestId?: string;
    /** Id som benyttes for å hente ut CancelButton i automatiske tester */
    cancelButtonTestId?: string;
    /** Id som benyttes for å hente ut PauseButton i automatiske tester */
    pauseButtonTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
    /** Funksjon som kalles om noen av feltene ikke er fylt ut eller ikke er fylt ut riktig */
    onFieldsNotCorrectlyFilledOut?: () => void;
}
export interface FormState {
    valid?: boolean;
    submitted?: boolean;
    formComponents: Array<FormChild>;
}
export interface FormChild extends Element {
    label?: string;
    legend?: string;
    validateField: () => Promise<void>;
    isValid: () => boolean;
    getWrappedInstance: () => FormChild;
    getText: () => string;
    getId: () => string;
    notifyValidated?: (valid: boolean) => void;
    props: FormChildProps;
}
export interface FormChildProps extends Element {
    id: string;
    key: string;
    label?: string;
    legend?: string;
    requiredLabel?: string;
    optionalLabel?: string;
    validateField?: () => Promise<void>;
    isValid?: () => boolean;
    isRequired?: boolean;
    /** Optional ref som overskriver lokal ref*/
    ref?: React.RefObject<HTMLButtonElement>;
}
export default class Form extends React.Component<FormProps, FormState> {
    static defaultProps: FormProps;
    validationSummaryRef: React.RefObject<HTMLDivElement>;
    constructor(props: FormProps);
    validateForm(cb?: () => void): void;
    areAllFieldsValid: () => boolean;
    onFormSubmit: (cb: () => void) => void;
    onChildValidated: () => void;
    isSubmitted: () => boolean | undefined;
    renderErrorMessage(): JSX.Element;
    renderButtons(): JSX.Element | null;
    renderLoader: () => JSX.Element | void;
    addFormComponent: (comp: FormChild) => Array<FormChild> | void;
    removeFormComponent: (comp: FormChild) => Array<FormChild> | void;
    renderValidationSummary: () => JSX.Element | void;
    renderChildren: () => React.FunctionComponentElement<any>[] | null | undefined;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map