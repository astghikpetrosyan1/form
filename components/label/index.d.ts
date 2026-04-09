import * as React from 'react';
interface Props {
    /** Tekst eller Element som vises i <label> node */
    labelText: string | JSX.Element;
    /** htmlFor HTML property som settes på <label> node */
    htmlFor?: string;
    /** Tekst eller Element som vises i <label> node */
    sublabelText?: string | JSX.Element;
    /** Element for hjelpeknapp */
    helpButton?: JSX.Element;
    className?: string;
    /** Legger CSSclasse for å styre font-weight på label  */
    isNotBold?: boolean;
    /** Optional ref som forwardes til HTMLButtonElement */
    ref?: React.RefObject<HTMLDivElement>;
    /** Id som benyttes for å hente ut komponent i automatiske tester */
    testId?: string;
    extension?: {
        url: string;
        valueString?: string;
        valueBoolean?: boolean;
    }[];
}
export declare const Label: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<Props>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default Label;
//# sourceMappingURL=index.d.ts.map
