import * as React from 'react';
import { SvgIcon } from '@helsenorge/designsystem-react/components/Icons';
interface FormPauseButtonProps {
    pauseButtonText?: string;
    /** Ekstra CSS-class som legges på pause knappen */
    pauseButtonClasses?: string;
    /** Pause button type. Default is 'action' */
    pauseButtonType?: 'action' | 'display' | 'function';
    /** If the pause button is a primary, secondary or tertiary button */
    pauseButtonLevel?: 'primary' | 'secondary' | 'tertiary';
    /** If the pause button has an icon to be shown on the left - only possible if submitButtonType is 'display'  */
    pauseButtonLeftIcon?: SvgIcon;
    /** If the pause button is disabled  */
    pauseButtonDisabled?: boolean;
    /** Function som kalles ved pause */
    onPause?: () => void;
    /** Id som benyttes for å hente ut PauseButton i automatiske tester */
    pauseButtonTestId?: string;
}
declare const FormPauseButton: React.FC<FormPauseButtonProps>;
export default FormPauseButton;
//# sourceMappingURL=form-pause-button.d.ts.map