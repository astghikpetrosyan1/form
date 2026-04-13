export const fileType = (fileUrl) => {
    const urlParts = fileUrl.split('.');
    const fileExtension = urlParts[urlParts.length - 1].toLowerCase();
    // Check if the file extension corresponds to an image or video format
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        return 'image';
    }
    else if (['mp4', 'avi', 'mov', 'wmv', 'webm'].includes(fileExtension)) {
        return 'video';
    }
    else {
        return 'unknown';
    }
};
export var IExtentionType;
(function (IExtentionType) {
    IExtentionType["choiceImage"] = "https://fhir.medlix.org/fhir/StructureDefinition/choiceImage";
    IExtentionType["mainImage"] = "https://fhir.medlix.org/fhir/StructureDefinition/mainImage";
    IExtentionType["showMainImage"] = "https://fhir.medlix.org/fhir/StructureDefinition/showMainImage";
    IExtentionType["image"] = "https://fhir.medlix.org/fhir/StructureDefinition/image";
})(IExtentionType || (IExtentionType = {}));
export const shouldRenderMainImage = (extension) => {
    var _a, _b;
    const extensions = extension !== null && extension !== void 0 ? extension : [];
    return (_b = (_a = extensions.find((ext) => ext.url === IExtentionType.showMainImage)) === null || _a === void 0 ? void 0 : _a.valueBoolean) !== null && _b !== void 0 ? _b : false;
};
//# sourceMappingURL=utils.js.map