import * as React from 'react';
export interface PrivateRadioGroupProps {
    defaultValue?: string;
    children?: JSX.Element | string;
    name: string;
    value?: string | null;
    classNameGroup?: string;
}
export interface PrivateRadioGroupState {
    defaultValue?: string;
}
export default class PrivateRadioGroup extends React.Component<PrivateRadioGroupProps, PrivateRadioGroupState> {
    radioGroupRef: React.RefObject<HTMLDivElement>;
    constructor(props: PrivateRadioGroupProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    setRadioNames(): void;
    getRadios(): NodeListOf<Element> | null;
    setCheckedRadio(): void;
    getCheckedValue(): string | null;
}
//# sourceMappingURL=index.d.ts.map