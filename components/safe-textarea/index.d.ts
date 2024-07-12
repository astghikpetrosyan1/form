import * as React from 'react';
/**
 * Dette tekstområdet kan trygt motta nye props fra parent uten at verdien i inputfeltet overskrives
 * hvis feltet redigeres akkurat idet de nye propene sendes inn fra parent. Endringer av feltet blir
 * sendt til parent ved onChange.
 */
type sizes = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export interface SafeTextareaState {
    value?: string;
    defaultValue?: string;
    focused?: boolean;
    blurred?: boolean;
    valid: boolean;
    validated?: boolean;
    size?: sizes;
    maxlength?: number;
    triggerHandleOnChange: boolean;
    propValue?: string;
}
export interface SafeTextareaProps {
    /** Unik ID */
    id: string;
    /** Verdi som vises i feltet */
    value?: string;
    /** Tekst placeholder som vises i feltet når det ikke er satt value */
    placeholder?: string;
    /** Om input feltet er readOnly */
    readOnly?: boolean;
    /** Om feltet er disabled */
    disabled?: boolean;
    /** HTML attribute rows på textarea */
    rows?: number;
    /** HTML attribute auto-focus på textarea */
    autoFocus?: boolean;
    /** Ekstra CSS-class som legges på wrapperen */
    wrapperClasses?: string;
    /** Ekstra CSS-class som legges på char-counter */
    charCounterClasses?: string;
    /** Min lengde på tekst i input */
    minlength?: number;
    /** Maks lengde på tekst i input. En feilmelding vises dersom man skriver inn flere tegn. */
    maxlength?: number;
    /** Størrelse på feltet */
    size?: sizes;
    /** Innhold som vises i komponentet */
    children?: React.ReactNode;
    /** Om en counter for max antall tegn skal vises */
    counter?: boolean;
    /** Om lengden på label skal vises eller ikke*/
    hideLengthLabel?: boolean;
    /** Function som kalles når fokus går bort fra feltet */
    onBlur?: (event: React.FocusEvent<{}>) => void;
    /** Function som kalles når fokus er på feltet */
    onFocus?: (event: React.FocusEvent<{}>) => void;
    /** Function som kalles når verdien i feltet endres */
    onChange?: (event: React.FormEvent<{}>) => void;
    /** Function som kalles når datoen valideres riktig */
    onValidated?: (valid: boolean) => void;
    /** Validator Function */
    validator?: (value: string | undefined) => boolean;
    /** ErrorMessages som vises gjennom validering */
    errorMessage?: string | ((value: string | number | undefined) => string);
    /** ErrorMessages som vises når feltet er required og ikke fylt ut */
    requiredErrorMessage?: string | ((value: string | number | undefined) => string);
    /** Om feltet er påkrevd eller ikke */
    isRequired?: boolean;
    /** Om label skal vises eller ikke */
    showLabel?: boolean;
    /** Teksten til label */
    label?: React.ReactNode;
    /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <label> til dette feltet. Dersom feltet har sublabel, brukes ikke prop maxLengthText */
    subLabel?: string | JSX.Element;
    /** Teksten til required label */
    requiredLabel?: string;
    /** Teksten til optional label */
    optionalLabel?: string;
    /** Om required label skal vises eller ikke */
    showRequiredLabel?: boolean;
    /** Om ekstra label skal vises eller ikke */
    showOptionalLabel?: boolean;
    /** HTML aria-label */
    ariaLabel?: string;
    /** Hjelpetrigger som vises etter label */
    helpButton?: JSX.Element;
    /** Element som vises når man klikker på HelpButton */
    helpElement?: JSX.Element;
    /** Update valid-state also when component is not updated through component */
    validateOnExternalUpdate?: boolean;
    /** Feilmelding som vises dersom for mange tegn skrives inn i feltet. Default tekst er "Du har skrevet for mange tegn. Gjør teksten kortere." */
    stringOverMaxLengthError?: string;
    /** Tekst som vises under feltet dersom hideLengthLabel er false. Default tekst er "Maksimum ${maxlength} tegn". Denne vises ikke dersom feltet har sublabel */
    maxLengthText?: string;
    /** Id som benyttes for å hente ut komponent i automatiske tester */
    testId?: string;
}
export declare class SafeTextarea extends React.Component<SafeTextareaProps, SafeTextareaState> {
    static hnFormComponent: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    constructor(props: SafeTextareaProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: SafeTextareaProps, prevState: SafeTextareaState): SafeTextareaState | null;
    componentDidUpdate(_prevProps: SafeTextareaProps, prevState: SafeTextareaState): void;
    validator: (value: string | undefined) => boolean;
    isValueOverMaxLength: (value: string | undefined) => boolean;
    isValueUnderMinLength: (value: string | undefined) => boolean;
    validate: (value: string | undefined) => Promise<void>;
    onBlur: (event: React.FocusEvent<{}>) => void;
    onChange: (event: React.FormEvent<{}>) => void;
    handleOnChange: (value: string, notify?: () => void) => void;
    notifyValidated: () => void;
    validateField: () => Promise<void>;
    isValidIfRequired: (value?: string) => boolean;
    isValid: () => boolean;
    onFocus: (event: React.FocusEvent<{}>) => void;
    focus: () => void;
    renderSubLabel: () => string | JSX.Element | undefined;
    renderLabel: () => JSX.Element | null;
    renderHelp: () => JSX.Element | undefined;
    renderErrorMessage: () => JSX.Element | null;
    render(): JSX.Element;
}
export default SafeTextarea;
//# sourceMappingURL=index.d.ts.map