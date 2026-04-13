import * as React from 'react';
interface FromDraftButtonProps {
    /** Teksten som vises på lagre knappen */
    draftButtonText?: string;
    /** Ekstra CSS-class som legges på lagre knappen */
    draftButtonClasses?: string;
    /** Function som kalles ved lagring */
    onDraft?: (event?: React.FormEvent<{}>) => void;
    /** Id som benyttes for å hente ut DraftButton i automatiske tester */
    draftButtonTestId?: string;
    /** onFormSubmit fra <Form> komponent */
    onFormSubmit: (cb: () => void) => void;
}
declare const FormDraftButton: React.FC<FromDraftButtonProps>;
export default FormDraftButton;
//# sourceMappingURL=form-draft-button.d.ts.map