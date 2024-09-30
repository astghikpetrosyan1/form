import * as React from 'react';
import './styles.scss';
interface InputProps {
    step?: string;
    onKeyPress?: (e: React.KeyboardEvent<unknown>) => void;
    onKeyUp?: (e: React.KeyboardEvent<unknown>) => void;
    onPaste?: (e: React.ClipboardEvent) => void;
}
export interface SafeInputFieldProps {
    /** Unik ID */
    id?: string;
    /** name attributt på input feltet */
    inputName?: string;
    /**  HMTL Input type */
    type?: string;
    /** Verdi som vises i feltet */
    value?: string | number;
    /** Tekst placeholder som vises i feltet når det ikke er satt value */
    placeholder?: string;
    /** Om input feltet er readOnly */
    readOnly?: boolean;
    /** Om feltet er disabled */
    disabled?: boolean;
    /** Ekstra CSS-class som legges på wrapperen */
    wrapperClasses?: string;
    /** Innhold som vises i komponentet */
    children?: React.ReactNode;
    /** Ekstra CSS-class som legges på feltet */
    className?: string;
    min?: number;
    /** Minimum lengde på tekst i input */
    minLength?: number;
    max?: number;
    /** Maksimum lengde på tekst i input. En feilmelding vises dersom man skriver inn flere tegn. */
    maxLength?: number;
    /** Function som kallers når det tastes i feltet */
    onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
    /** Function som kalles når fokus går bort fra feltet */
    onBlur?: (event: React.FocusEvent<{}>) => void | undefined;
    /** Validator Function som kalles når fokus går bort fra feltet */
    onBlurValidator?: (value: string | number) => Promise<boolean>;
    /** Function som kalles når fokus er på feltet */
    onFocus?: (event: React.FocusEvent<{}>, id: string | undefined) => void;
    /** Function som kalles når verdien i feltet endres */
    onChange?: (event: React.FormEvent<{}>, id: string | undefined, formattedValue: string) => void;
    /** Function som kalles når datoen valideres riktig */
    onValidated?: (valid: boolean | undefined) => void;
    /** Tillatter bare endringer av feltet hvis denne funksjonen returnerer true */
    onChangeValidator?: (value: string | number) => boolean;
    /** Validerer value ved submit, dersom required */
    onSubmitValidator?: (value?: string | number) => boolean;
    /** Denne funksjonen returnere strengen dette feltet settes til etter onChange. Tar imot e.target.value */
    onChangeFormatter?: (value: string | number) => string;
    /** ErrorMessages som vises gjennom validering */
    errorMessage?: string | ((value: string | number | undefined) => string);
    /** Meldingen som vises ved feilmelding om required*/
    requiredErrorMessage?: string | ((value: string | number | undefined) => string);
    /** Component som vises ved validartion error */
    validationErrorRenderer?: JSX.Element;
    /** Om feltet er påkrevd eller ikke */
    isRequired?: boolean;
    /** Om label skal vises eller ikke */
    showLabel?: boolean;
    /** Teksten til label */
    label?: string | JSX.Element;
    /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <label> til dette feltet */
    subLabel?: string | JSX.Element;
    /** Teksten til required label */
    requiredLabel?: string;
    /** Teksten til optional label */
    optionalLabel?: string;
    /** HTML aria-required */
    ariaRequired?: boolean;
    /** HTML aria-label */
    ariaLabel?: string;
    /** HTML aria-labbeledby*/
    ariaLabelledby?: string;
    /** Optional regex pattern for validate methoden */
    pattern?: string;
    /** Om required label skal vises eller ikke */
    showRequiredLabel?: boolean;
    /** Om ekstra label skal vises eller ikke */
    showOptionalLabel?: boolean;
    /** størrelse på feltet */
    size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'fullSize';
    /** Om feltet skal beholde auto størrelse */
    keepDefaultSize?: boolean;
    /** Plassering til Spinner */
    blurSpinnerAlignment?: 'left' | 'right';
    /** TabIndex på selve komponent'en */
    tabIndex?: number;
    /** Hjelpetrigger som vises etter label */
    helpButton?: JSX.Element;
    /** Element som vises når man klikker på HelpButton */
    helpElement?: JSX.Element;
    /** Events to be forwarded - brukes i gamle pasientreiser og skjemautfyller - kan muligens fases ut etterhvert
     *  @deprecated
     */
    inputProps?: InputProps;
    /** attribute autocomplete,  */
    autocomplete?: string;
    isValidationHidden: boolean;
    /** Update valid-state also when component is not updated through component */
    validateOnExternalUpdate?: boolean;
    /** Feilmelding som vises dersom for mange tegn skrives inn i feltet. Default tekst er "Du har skrevet for mange tegn. Gjør teksten kortere." */
    stringOverMaxLengthError?: string;
    /** Id som benyttes for å hente ut input i automatiske tester */
    inputTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
    /** Id som benyttes for å hente ut Label i automatiske tester */
    labelTestId?: string;
    /** Sufix jsx of input */
    sufix?: string;
    /** prefix jsx of input */
    prefix?: string;
}
export interface SafeInputFieldState {
    focused?: boolean;
    isValid: boolean;
    value?: string | number;
    validated?: boolean;
    loading: boolean;
    dirtyInput: boolean;
    onBlurValidationPromise?: Promise<boolean>;
    handleValidation?: boolean;
    propValue?: string | number;
}
/**
 * Dette tekstinputfeltet kan trygt motta nye props fra parent uten at verdien i inputfeltet overskrives
 * hvis feltet redigeres akkurat idet de nye propene sendes inn fra parent. Endringer av feltet blir
 * sendt til parent ved onBlur.
 */
export default class SafeInputField extends React.Component<SafeInputFieldProps, SafeInputFieldState> {
    static hnFormComponent: boolean;
    inputFieldRef: React.RefObject<HTMLInputElement>;
    static defaultProps: SafeInputFieldProps;
    constructor(props: SafeInputFieldProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: SafeInputFieldProps, prevState: SafeInputFieldState): SafeInputFieldState | null;
    componentDidUpdate(_prevProps: SafeInputFieldProps, prevState: SafeInputFieldState): void;
    onChange(e: React.FormEvent<{}>): void;
    handleChange(value: string, notify?: (formattedValue: string) => void): void;
    handleValidation(value: string, formattedValue: string, notify?: (formattedValue: string) => void): void;
    notifyChanged(e: React.FormEvent<{}>, formattedValue: string): void;
    notifyValidated(): void;
    onMouseDown(): void;
    onFocus(e: React.FocusEvent<{}>): void;
    onBlur(e: React.FocusEvent<{}>): void;
    focus(): void;
    isTypeNumber(): boolean;
    validate(value: string | number | undefined): boolean;
    isValueOverMaxLength(value: string | number | undefined): boolean | "" | 0 | undefined;
    validateNumber(value: string | number | undefined): boolean;
    validateField(): Promise<void>;
    isValidIfRequired(): boolean;
    isValid(): boolean;
    renderErrorMessage(): JSX.Element | null;
    createMarkup(htmlString: string): {
        __html: string;
    };
    renderLabel: () => React.JSX.Element | null;
    getInputClasses(): string;
    render(): React.JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map