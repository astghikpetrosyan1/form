import * as React from 'react';
import { ValidationProps } from '../validation';
interface State {
    value: string;
}
export default class WrappedComponent extends React.Component<ValidationProps, State> {
    constructor(props: ValidationProps);
    inputFieldChange: (event: React.FormEvent<{}>) => void;
    render(): React.JSX.Element;
}
export {};
//# sourceMappingURL=wrapped-component-example.d.ts.map