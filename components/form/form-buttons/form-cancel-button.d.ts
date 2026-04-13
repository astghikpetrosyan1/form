import * as React from 'react';
import { SvgIcon } from '@helsenorge/designsystem-react/components/Icons';
interface FormCancelButtonProps {
    /** The text to be shown on the cancel button */
    cancelButtonText?: string;
    /** The CSS classes to be added to the cancelbutton */
    cancelButtonClasses?: string;
    /** Cancel button type. Default is 'action' */
    cancelButtonType?: 'action' | 'display';
    /** If the cancel button has an icon to be shown on the left - only possible if cancelButtonType is 'display' */
    cancelButtonLeftIcon?: SvgIcon;
    /** If the cancel button is disabled  */
    cancelButtonDisabled?: boolean;
    /** Function som kalles ved klikk på Avrbyt */
    onCancel?: (event?: React.FormEvent<{}>) => void;
    /** Id som benyttes for å hente ut CancelButton i automatiske tester */
    cancelButtonTestId?: string;
    /** Setter outline variant på CancelButton */
    cancelButtonOutline?: boolean;
}
declare const FormCancelButton: React.FC<FormCancelButtonProps>;
export default FormCancelButton;
//# sourceMappingURL=form-cancel-button.d.ts.map