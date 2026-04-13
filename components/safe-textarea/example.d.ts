import * as React from 'react';
type sizes = 'small' | 'medium' | 'large' | 'maxlength';
interface SafeTextareaExampleState {
    isValid: boolean;
    value: string;
    size?: sizes;
    maxLength?: number;
    showmax: boolean;
    questionnaireValue: QuestionnaireResponseItemAnswer;
}
interface QuestionnaireResponseItemAnswer {
    valueString: string;
}
export declare class SafeTextareaExample extends React.Component<{}, SafeTextareaExampleState> {
    constructor(props: {});
    onBlur(): void;
    getStringValue(answer: QuestionnaireResponseItemAnswer): string;
    onChange(event: React.FormEvent<{}>): void;
    handleChange: (event: React.FormEvent<{}>) => void;
    onFocus(): void;
    debouncedHandleChange: (event: React.FormEvent<{}>) => void;
    handleRadioChange(radioknapp: sizes): void;
    handleMaxLengthChange(e: React.FormEvent<{}>): void;
    notifyValidated: (isValid: boolean) => void;
    render(): JSX.Element;
}
export default SafeTextareaExample;
//# sourceMappingURL=example.d.ts.map