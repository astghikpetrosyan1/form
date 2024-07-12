import * as React from 'react';
import { FormChild } from '../form';
import './styles.scss';
export interface DropdownProps {
    /** Unik ID */
    id?: string;
    /** Label til dropdown > skal renames til Label */
    name: string;
    /** Påkrev prop som sendes til toggleDropdown brukes for å skille Dropdownene ved bruk av multiple Dropdowns */
    index: number;
    /** Verdi til children - vises ikke i feltet, brukes bare til å triggere validateField */
    value?: string | Array<string>;
    /** Function som kalles ved klikk på Dropdown */
    toggleDropdown: (index: number) => void;
    /** Om dropdown er åpen */
    open: boolean;
    icon?: JSX.Element;
    /** Om dropdown skal tilpasses bredden til innholdet */
    respectContent?: boolean;
    /** Om dropdown skal ta hele bredden */
    isFullWidth?: boolean;
    /** Om det vises en pil som peker mot høyre - brukes ofte på mobil */
    arrowRight?: boolean;
    /** Ekstra CSS-class som legges på div'en */
    className?: string;
    /** Innhold som vises i komponentet */
    children?: React.ReactNode;
    /** An array of refs to the children to validate */
    childrenToValidate?: Array<React.RefObject<FormChild>>;
    /** Teksten til required label */
    requiredLabel?: string;
    /** Teksten til optional label */
    optionalLabel?: string;
    /** Om required label skal vises eller ikke */
    showRequiredLabel?: boolean;
    /** Om optional label skal vises eller ikke */
    showOptionalLabel?: boolean;
    /** Function som kalles når feltet valideres riktig */
    onValidated?: (valid: boolean | undefined) => void;
    /** ErrorMessage som vises gjennom validering */
    errorMessage?: string;
    /** Component som vises ved validation error */
    validationErrorRenderer?: JSX.Element;
    /** Om feltet er påkrevd eller ikke */
    isRequired?: boolean;
    /** Id som benyttes for å hente ut Button i automatiske tester */
    buttonTestId?: string;
    /** Id som benyttes for å hente ut ValidationError i automatiske tester */
    validationTestId?: string;
}
interface DropdownState {
    focus: boolean;
    isValid: boolean;
    value?: string | Array<string>;
    validated: boolean;
}
export declare class Dropdown extends React.Component<DropdownProps, DropdownState> {
    buttonRef: React.RefObject<HTMLButtonElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
    constructor(props: DropdownProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: DropdownProps, prevState: DropdownState): DropdownState | null;
    componentDidUpdate(prevProps: DropdownProps): void;
    componentWillUnmount(): void;
    getChildValidation: (child: FormChild) => Promise<boolean>;
    validateField: () => Promise<void>;
    notifyValidated: () => void;
    isValid: () => boolean;
    renderErrorMessage: () => JSX.Element;
    renderLabel: () => JSX.Element;
    clickListener: (evt: MouseEvent) => void;
    addClickListener: () => void;
    removeClickListener: () => void;
    toggleDropdown: () => void;
    onFocus: () => void;
    onBlur: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map