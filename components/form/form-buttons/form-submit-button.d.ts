import * as React from 'react';
interface FormSubmitButtonProps {
    /** Teksten som vises på submit knappen */
    submitButtonText?: string;
    /** Ekstra CSS-class som legges på submit knappen */
    submitButtonClasses?: string;
    /** If the submit button has an icon to be shown on the left - only possible if submitButtonType is 'display' */
    submitButtonLeftIcon?: boolean;
    /** If the submit button has an icon to be shown on the right - only possible if submitButtonType is 'display'  */
    submitButtonRightIcon?: boolean;
    /** Submit button type. Default is 'action' */
    submitButtonType?: 'action' | 'display';
    /** If the submit button is disabled  */
    submitButtonDisabled?: boolean;
    /** Function som kalles ved Submit */
    onSubmit?: (event?: React.FormEvent<{}>) => void;
    /** Id som benyttes for å hente ut SubmitButton i automatiske tester */
    submitButtonTestId?: string;
    /** onFormSubmit fra <Form> komponent */
    onFormSubmit: (cb: () => void) => void;
}
declare const FormSubmitButton: React.FC<FormSubmitButtonProps>;
export default FormSubmitButton;
//# sourceMappingURL=form-submit-button.d.ts.map