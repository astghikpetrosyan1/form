import * as React from 'react';
import { FormChild } from '..';
import './styles.scss';
export interface Props extends React.PropsWithChildren<{}> {
    components: Array<FormChild>;
    submitted?: boolean;
    header: string;
}
declare const ValidationSummary: React.FC<Props>;
export default ValidationSummary;
//# sourceMappingURL=index.d.ts.map