import * as React from 'react';
export interface ExtensionValue {
    url: string;
    valueBoolean?: boolean;
    valueString?: string;
}
export interface MainImageProps {
    extension?: ExtensionValue[];
    className?: string;
}
export declare const MainImage: React.FC<MainImageProps>;
export default MainImage;
//# sourceMappingURL=main-image.d.ts.map