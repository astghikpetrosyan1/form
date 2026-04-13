import * as React from 'react';
import { Option } from '../checkbox-group';
import { FormChild } from '../form';
interface DropdownExampleState {
    dropdown0: boolean;
    dropdown1: boolean;
    dropdown2: boolean;
    dropdown3: boolean;
    dropdown4: boolean;
    dropdown5: boolean;
    dropdown4Value: string | undefined;
    dropdown5Value: string | undefined;
    inputValue1: string;
    inputValue2: string;
    inputValue3: string;
    checkboxes: Array<Option>;
}
export declare class DropdownExample extends React.Component<{}, DropdownExampleState> {
    inputfieldInDropdownRef1: React.RefObject<FormChild>;
    inputfieldInDropdownRef2: React.RefObject<FormChild>;
    checkboxInDropdownRef: React.RefObject<FormChild>;
    constructor(props: {});
    toggleOpen: (index: number) => void;
    updateDropdown4Value: (index: number, value: string) => void;
    updateDropdown5Value: () => void;
    updateCheckboxValue: (id: string) => void;
    render(): JSX.Element;
}
export default DropdownExample;
//# sourceMappingURL=example.d.ts.map