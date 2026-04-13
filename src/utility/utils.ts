export const fileType = (fileUrl: string): 'image' | 'video' | 'unknown' => {
  const urlParts = fileUrl.split('.');
  const fileExtension = urlParts[urlParts.length - 1].toLowerCase();

  // Check if the file extension corresponds to an image or video format
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
    return 'image';
  } else if (['mp4', 'avi', 'mov', 'wmv', 'webm'].includes(fileExtension)) {
    return 'video';
  } else {
    return 'unknown';
  }
};

export enum IExtentionType {
  choiceImage = 'https://fhir.medlix.org/fhir/StructureDefinition/choiceImage',
  mainImage = "https://fhir.medlix.org/fhir/StructureDefinition/mainImage",
  showMainImage = 'https://fhir.medlix.org/fhir/StructureDefinition/showMainImage',
  image = 'https://fhir.medlix.org/fhir/StructureDefinition/image',
}
