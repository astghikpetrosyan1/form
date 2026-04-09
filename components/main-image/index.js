import * as React from 'react';
// @ts-ignore
import NoImage from '../../img/no-image.jpg';
import { fileType, IExtentionType } from '../../utility/utils';
const MainImage = ({ extension, className }) => {
    var _a, _b;
    const showMainImage = extension ? (_a = extension.find((item) => item.url === IExtentionType.showMainImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean : false;
    const mainImage = extension ? (_b = extension.find((item) => item.url === IExtentionType.mainImage)) === null || _b === void 0 ? void 0 : _b.valueString : '';
    if (!showMainImage) {
        return null;
    }
    const wrapperClassName = className ? className : 'file-list';
    if (!mainImage) {
        return (React.createElement("div", { className: wrapperClassName },
            React.createElement("img", { src: NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })));
    }
    const mediaType = fileType(mainImage);
    if (mediaType === 'image') {
        return (React.createElement("div", { className: wrapperClassName },
            React.createElement("img", { src: mainImage || NoImage, alt: '', width: "223px", height: "200px", style: { objectFit: 'contain' } })));
    }
    if (mediaType === 'video') {
        return (React.createElement("div", { className: wrapperClassName },
            React.createElement("video", { controls: true, style: { width: '100%' } },
                React.createElement("source", { src: mainImage, type: "video/mp4" }),
                "Your browser does not support the video tag.")));
    }
    return null;
};
export default MainImage;
//# sourceMappingURL=index.js.map
