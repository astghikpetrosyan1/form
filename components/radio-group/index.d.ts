import * as React from 'react';
import './styles.scss';
export interface RadioGroupProps {
    /**
     * Must be unique for the application. If it is not unique, interaction with one radio group will change all
     * radio groups sharing the id.
     */
    id: string;
    /**
     * Transform that can be applied an element of the options array to replace a label containing a path
     * with the actual string to be shown
     */
    labelStringFetcher?: (content: string) => string;
    /** Function som kalles onChange */
    onChange: (value?: string) => void;
    /** Ekstra CSS-class som legges på wrapper'en */
    wrapperClassName?: string;
    /** Ekstra CSS-class som legges på label */
    labelClassName?: string;
    /** En Array med alle radioknappene inkl. options */
    options: Array<Options>;
    /** Om det er påkrevd å huke av boksen */
    isRequired?: boolean;
    /** Label som vises ved required validation feilmelding */
    requiredLabel?: string;
    /** Ekstra label som vises ved required validation feilmelding */
    optionalLabel?: string;
    /** Hvilken radio-knapp er selected som default */
    selected?: string;
    /** legger en kommentar før hjelp på radio-gruppen */
    legend?: string | JSX.Element;
    /** ekstra CSS-class som legges på <legend> */
    legendClassName?: string;
    /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <legend> til dette feltet */
    subLabel?: string | JSX.Element;
    /** Validator Function som returnerer true/false for validering */
    validator?: (value: string | undefined) => boolean;
    /** Function som kalles når validering er ok */
    onValidated?: (valid: boolean) => void;
    /** Function som kalles for å rendre feilmeldinger */
    getErrorMessage?: (value: string) => string;
    /** Settes til true for å vise ekstra label */
    showRequiredLabel?: boolean;
    /** Settes til true for å vise ekstra optional label */
    showOptionalLabel?: boolean;
    /** Settes til true for å fjerne Fieldset, legend og help funksjonaliteter  */
    noFieldset?: boolean;
    /** ekstra CSS-class som legges på <fieldset> */
    fieldsetClassName?: string;
    /** Legger en ekstra aria-labelledBy på selve radiogroup */
    ariaLabelledBy?: string;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
    /** Innhold som vises under radiogruppen */
    children?: JSX.Element;
    /** Viser blue radio-button istedenfor vanlig lilla */
    isStyleBlue?: boolean;
    /** Viser boxed radio-button istedenfor vanlig styling */
    isStyleBoxed?: boolean;
    /** Update valid-state also when component is not updated through component */
    validateOnExternalUpdate?: boolean;
    /** Id som benyttes for å hente ut komponent i automatiske tester */
    testId?: string;
    /** ekstra CSS-class som legges på radiogruppen */
    classNameGroup?: string;
    /** choiceImage is show image */
    choiceImage?: boolean;
    /**
     * text is required label
     */
    text?: string;
    /**
     * List of extension to check images, show hide conditions
     */
    extension?: {
        url: string;
        valueString?: string;
        valueBoolean?: boolean;
    }[];
}
export interface Options {
    type: string;
    label: string;
    ariaLabel?: string;
    image?: string;
    disabled?: boolean;
    content?: JSX.Element;
    hjelpetrigger?: JSX.Element;
    extension?: {
        url: string;
        valueString?: string;
        valueBoolean?: boolean;
    }[];
}
export interface RadioGroupState {
    lastFocusedValue?: string;
    valid: boolean;
    validated?: boolean;
    shouldValidate?: boolean;
}
export declare class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    static hnFormComponent: boolean;
    constructor(props: RadioGroupProps, context: Record<string, unknown>);
    static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState): RadioGroupState;
    componentDidUpdate(_prevProps: RadioGroupProps, prevState: RadioGroupState): void;
    onChange(e: React.FormEvent<{}>): void;
    onClick(e: React.MouseEvent<{}>): void;
    changeSelectedValue(value: string, notify?: (value: string) => void): void;
    validate(value: string | undefined): Promise<void>;
    notifyValidated(): void;
    validateField(): Promise<void>;
    isValid(): boolean;
    renderErrorMessage(): JSX.Element | null;
    renderLegend(): JSX.Element | null;
    isRadioValid(value: string): boolean;
    renderHelp(): JSX.Element | undefined;
    renderImage(): React.JSX.Element | null;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map