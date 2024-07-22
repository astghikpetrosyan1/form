import * as React from 'react';
export interface Option {
    /** Unik Id for Checbox'en */
    id: string;
    /** Label som vises ved elementen */
    label: string;
    /** Om checkbox'en er checked som default */
    checked?: boolean;
    /** image of package */
    image?: string;
    hjelpetrigger?: JSX.Element;
    /** Om checkbox'en er disabled */
    disabled?: boolean;
}
interface Props {
    /** Unik Id for Checbox gruppen */
    id: string;
    /** En Array med alle Checbox'en inkl. options */
    checkboxes: Array<Option>;
    /** Function som kalles onChange */
    handleChange: (id: string) => void;
    /** Viser blå Checkboxer istedenfor default lilla stil */
    isStyleBlue?: boolean;
    /** legger en kommentar etter helpButton på checkbox gruppen */
    legend?: string | JSX.Element;
    /** ekstra CSS-class som legges på <legend> */
    legendClassName?: string;
    /** Teksten til sub label, brukes som enkel hjelpetekst. Sublabel legges som et eget blokk-element nederst i <legend> til dette feltet */
    subLabel?: string | JSX.Element;
    /**  Function som kalles ved validation */
    onValidated?: (valid: boolean | undefined) => void;
    /**  Melding som vises ved validation feil */
    errorMessage?: string;
    /** Om det er påkrevd å huke av boksen */
    isRequired?: boolean;
    /** Label som vises ved required validation feilmelding */
    requiredLabel?: string;
    /** Ekstra label som vises ved required validation feilmelding */
    optionalLabel?: string;
    /** Settes til true for å vise ekstra label */
    showRequiredLabel?: boolean;
    /** Settes til true for å vise ekstra optional label */
    showOptionalLabel?: boolean;
    /** Maks antall bokser som det er tillatt å huke av */
    max?: number;
    /** Minst antall bokser som det er påkrevd å huke av */
    min?: number;
    /** Extra CSS-classer som legges på wrapper */
    className?: string;
    /** Om det skal legges på en ekstra wrapper etter fieldset */
    hasInnerWrapper?: boolean;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
    /** Update valid-state also when component is not updated through component */
    validateOnExternalUpdate?: boolean;
    /** Id som benyttes for å hente ut CheckboxGroup i automatiske tester */
    checkboxGroupTestId?: string;
    /** Id som benyttes for å hente ut Checkbox i automatiske tester */
    checkboxTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
    /** ClassName til fieldset taggen */
    fieldsetClassName?: string;
    /** choiceImage is show image */
    choiceImage?: boolean;
    /**
     * showMainImage is boolean to show main image
     */
    showMainImage?: boolean;
    /**
     * image is main image src
     */
    image?: string;
    /**
     * text is required label
     */
    text?: string;
}
interface State {
    valid: boolean;
    validated: boolean;
}
export default class CheckBoxGroup extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    validateField(): Promise<void>;
    isValid(): boolean;
    validate: (validated?: boolean) => boolean;
    notifyValidated: () => void;
    renderHelp(): JSX.Element | undefined;
    renderImage(): React.JSX.Element | null;
    renderLegend(): JSX.Element | null;
    render(): React.JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map