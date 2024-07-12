import * as React from 'react';
import './styles.scss';
export interface SafeSelectProps {
    /** Unik ID */
    id: string;
    /** name attributt på select feltet */
    selectName?: string;
    /** HTML options som vises under <select> */
    options?: HTMLOptionElement[];
    /**  HMTL Input type */
    type?: string;
    /** Verdi som vises i feltet */
    value?: string;
    /** Verdi som er selected */
    selected?: string;
    /** Om feltet er disabled  */
    disabled?: boolean;
    /** Tekst placeholder som vises i feltet når det ikke er satt value */
    placeholder?: HTMLOptionElement;
    /** Innhold som vises i komponentet */
    children?: React.ReactNode;
    /** Ekstra CSS-class som legges på feltet */
    className?: string;
    /** Ekstra CSS-class som legges på wrapper'en */
    wrapperClasses?: string;
    /** Function som kallers når det tastes i feltet */
    onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLSelectElement>>;
    /** Function som kalles når fokus er på feltet */
    onFocus?: (event: React.FocusEvent<{}>, id: string) => void;
    /** Function som kalles når verdien i feltet endres */
    onChange?: (event: React.FormEvent<{}>, id: string) => void;
    /** Function som kalles når datoen valideres riktig */
    onValidated?: (valid: boolean | undefined) => void;
    /** Tillatter bare endringer av feltet hvis denne funksjonen returnerer true */
    onChangeValidator?: (value: string | undefined) => boolean;
    /** Denne funksjonen returnere strengen dette feltet settes til etter onChange. Tar imot e.target.value. */
    onChangeFormatter?: (value: string) => string;
    /** ErrorMessage som vises gjennom validering */
    errorMessage?: string | ((value: string | number | undefined) => string);
    /** Component som vises ved validation error */
    validationErrorRenderer?: JSX.Element;
    /** Om feltet er påkrevd eller ikke */
    isRequired?: boolean;
    /** Om label skal vises eller ikke */
    showLabel?: boolean;
    /** Denne viser sorterings-label til venstre for SelectBoxen*/
    showLabelLeft?: boolean;
    /** Teksten til label */
    label?: string | JSX.Element;
    /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <label> til dette feltet */
    subLabel?: string | JSX.Element;
    /** HTML aria-required */
    ariaRequired?: boolean;
    /** HTML aria-label */
    ariaLabel?: string;
    /** HTML aria-labbeledby*/
    ariaLabelledby?: string;
    /** TabIndex på selve komponent'en */
    tabIndex?: number;
    /** Teksten til required label */
    requiredLabel?: string;
    /** Teksten til optional label */
    optionalLabel?: string;
    /** Om required label skal vises eller ikke */
    showRequiredLabel?: boolean;
    /** Om ekstra label skal vises eller ikke */
    showOptionalLabel?: boolean;
    /** Hjelpetrigger som vises etter label */
    helpButton?: JSX.Element;
    /** Element som vises når man klikker på HelpButton */
    helpElement?: JSX.Element;
    /** Id som benyttes for å hente ut select i automatiske tester */
    selectTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
    /** Id som benyttes for å hente ut Label i automatiske tester */
    labelTestId?: string;
}
export interface SafeSelectState {
    isValid: boolean;
    value?: string;
    validated?: boolean;
}
export default class SafeSelectField extends React.Component<SafeSelectProps, SafeSelectState> {
    static hnFormComponent: boolean;
    static defaultProps: SafeSelectProps;
    selectElementRef: React.RefObject<HTMLSelectElement>;
    constructor(props: SafeSelectProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: SafeSelectProps, prevState: SafeSelectState): SafeSelectState | null;
    onChange: (e: React.FormEvent<{}>) => void;
    notifyChanged: (e: React.FormEvent<{}>) => void;
    notifyValidated: () => void;
    onFocus: (e: React.FocusEvent<{}>) => void;
    focus: () => void;
    getOptionWithValue: (value: string | undefined) => HTMLOptionElement | undefined;
    validateField: () => Promise<void>;
    isValid: () => boolean;
    renderErrorMessage: () => JSX.Element;
    renderLabel: () => React.JSX.Element | null;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map