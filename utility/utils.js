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
//# sourceMappingURL=utils.js.map