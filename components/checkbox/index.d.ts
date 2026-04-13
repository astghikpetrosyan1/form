import * as React from 'react';
import './styles.scss';
export interface CheckboxProps {
    /** Unik Id for Input */
    id: string;
    /** Label som vises ved elementen */
    label: string | JSX.Element;
    /** Om checkbox'en er checked som default */
    checked?: boolean;
    /** Innhold som vises i komponentet */
    children?: React.ReactNode;
    /** Function som kalles onChange */
    onChange: (event?: React.FormEvent<{}>) => void;
    /** Viser blå Checkbox istedenfor default lilla stil */
    isStyleBlue?: boolean;
    /** Viser boxed Checkbox istedenfor vanlig styling */
    isStyleBoxed?: boolean;
    /** Extra CSS-classer som legges på wrapper */
    className?: string;
    /** Extra CSS-classer som legges på label */
    labelClassName?: string;
    /** Om checkbox'en er disabled */
    disabled?: boolean;
    /** legger en kommentar etter labelteksten og suffix'en på checkbox'en */
    comment?: string;
    /** Om det er påkrevd å huke av boksen */
    isRequired?: boolean;
    /**  Melding som vises ved validation feil */
    errorMessage?: string;
    /**  Function som kalles ved validation */
    onValidated?: (valid: boolean) => void;
    helpButton?: JSX.Element;
    helpElement?: JSX.Element;
    /** Update valid-state also when component is not updated through component */
    validateOnExternalUpdate?: boolean;
    /** Id som benyttes for å hente ut Label i automatiske tester */
    labelTestId?: string;
    /** Id som benyttes for å hente ut Checkbox i automatiske tester */
    checkboxTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
}
export interface CheckboxState {
    valid: boolean;
    validated: boolean;
}
export declare class CheckBox extends React.Component<CheckboxProps, CheckboxState> {
    static hnFormComponent: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    constructor(props: CheckboxProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: CheckboxProps): void;
    setChecked(): void;
    validateField(): Promise<void>;
    validate(value: boolean | undefined, notifyValidated?: boolean): Promise<void>;
    isValid(): boolean;
    onChange: (event: React.FormEvent<{}>) => void;
    handleOnChange: (checked?: boolean, notify?: () => void) => void;
    notifyValidated(): void;
    renderHelp(): JSX.Element | null;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map