import * as React from 'react';
// @ts-ignore
import NoImage from '../../img/no-image.jpg';
import { fileType, IExtentionType, shouldRenderMainImage } from '../../utility/utils';
export const MainImage = ({ extension, className = 'file-list' }) => {
    var _a, _b;
    const extensions = extension !== null && extension !== void 0 ? extension : [];
    const showMainImage = shouldRenderMainImage(extension);
    const mainImage = (_b = (_a = extensions.find((ext) => ext.url === IExtentionType.mainImage)) === null || _a === void 0 ? void 0 : _a.valueString) !== null && _b !== void 0 ? _b : '';
    if (!showMainImage) {
        return null;
    }
    return (React.createElement("div", { className: className }, !mainImage ? (React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'image' ? (React.createElement("img", { src: mainImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })) : fileType(mainImage) === 'video' ? (React.createElement("video", { controls: true, style: { width: '100%' } },
        React.createElement("source", { src: mainImage, type: "video/mp4" }),
        "Your browser does not support the video tag.")) : null));
};
export default MainImage;
//# sourceMappingURL=main-image.js.map