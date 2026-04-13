import * as React from 'react';
// @ts-ignore
const NoImage = "../../img/no-image.jpg";
import { fileType, IExtentionType } from '../../utility/utils';
export const MainImage = ({ extension }) => {
    var _a, _b;
    const showMainImage = extension ? (_a = extension.find((ext) => ext.url === IExtentionType.showMainImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean : false;
    const mainImage = extension ? (_b = extension.find((ext) => ext.url === IExtentionType.mainImage)) === null || _b === void 0 ? void 0 : _b.valueString : "";
    if (!showMainImage) {
        return null;
    }
    return (React.createElement("div", { className: "file-list" }, !mainImage ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'image' ? (React.createElement("img", { src: mainImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
        React.createElement("source", { src: mainImage, type: "video/mp4" }),
        "Your browser does not support the video tag.")) : null));
};
export default MainImage;
//# sourceMappingURL=main-image.js.map