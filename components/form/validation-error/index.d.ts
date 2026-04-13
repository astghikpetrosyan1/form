import * as React from 'react';
import './../styles.scss';
export interface ValidationErrorProps {
    /** Om komponenten vises eller ikke */
    isValid: boolean;
    /** Error objektet som visning av feilmeldingen baserer seg på */
    error?: string | (() => string);
    /** Ekstra CSS-class som legges på UnmountClosed component  */
    className?: string;
    /** Ekstra CSS-class som legges på mol_validation__errortext div'en */
    textClassName?: string;
    /** Id som benyttes for å hente ut komponent i automatiske tester */
    testId?: string;
}
export declare const ValidationError: React.FC<ValidationErrorProps>;
export default ValidationError;
//# sourceMappingURL=index.d.ts.map