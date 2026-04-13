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

const DEV_MEDIA_PREFIX = 'https://cockpit.medlix-dev.org/';

const isAbsoluteUrl = (value: string): boolean => /^[a-z][a-z\d+\-.]*:\/\//i.test(value);

const isDevEnvironment = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const host = window.location.hostname.toLowerCase();
  return host === 'localhost' || host === '127.0.0.1' || host.includes('dev');
};

export const resolveMediaUrl = (fileUrl?: string): string => {
  if (!fileUrl) {
    return '';
  }

  if (isAbsoluteUrl(fileUrl) || fileUrl.startsWith('data:') || fileUrl.startsWith('blob:')) {
    return fileUrl;
  }

  if (isDevEnvironment()) {
    return new URL(fileUrl, DEV_MEDIA_PREFIX).toString();
  }

  return fileUrl;
};

export enum IExtentionType {
  choiceImage = 'https://fhir.medlix.org/fhir/StructureDefinition/choiceImage',
  mainImage = "https://fhir.medlix.org/fhir/StructureDefinition/mainImage",
  showMainImage = 'https://fhir.medlix.org/fhir/StructureDefinition/showMainImage',
  image = 'https://fhir.medlix.org/fhir/StructureDefinition/image',
}

export const shouldRenderMainImage = (
  extension?: Array<{
    url: string;
    valueBoolean?: boolean;
  }>
): boolean => {
  const extensions = extension ?? [];
  return extensions.find((ext) => ext.url === IExtentionType.showMainImage)?.valueBoolean ?? false;
};
