import * as React from 'react';
import { ValidationProps } from './validation';
interface FieldsetProps {
    className?: string;
    legendText: string;
    validateField: () => Promise<void>;
    isValid: () => boolean;
    onValidated?: (valid: boolean) => void;
    errorMessage?: string | ((value: boolean) => string);
}
export default class Fieldset extends React.Component<FieldsetProps & ValidationProps, {}> {
    static hnFormComponent: boolean;
    renderErrorMessage(): JSX.Element;
    notifyValidated: (valid: boolean) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=fieldset.d.ts.map