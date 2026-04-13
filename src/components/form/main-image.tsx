import * as React from 'react';
// @ts-ignore
const NoImage = "../../img/no-image.jpg";
import { fileType, IExtentionType } from '../../utility/utils';

export interface ExtensionValue {
  url: string;
  valueBoolean?: boolean;
  valueString?: string;
}

export interface MainImageProps {
  extension?: ExtensionValue[];
  className?: string;
}

export const MainImage: React.FC<MainImageProps> = ({ extension, className = 'file-list' }) => {
  const showMainImage = extension ? extension.find((ext) => ext.url === IExtentionType.showMainImage)?.valueBoolean : false;
  const mainImage = extension ? extension.find((ext) => ext.url === IExtentionType.mainImage)?.valueString : "";

  if (!showMainImage) {
    return null;
  }

  return (
    <div className={className}>
      {!mainImage ? (
        <img src={NoImage} alt='' width="223px" height="200px" style={{ objectFit: 'contain' }} />
      ) : fileType(mainImage) === 'image' ? (
        <img src={mainImage || NoImage} alt='' width="223px" height="200px" style={{ objectFit: 'contain' }} />
      ) : fileType(mainImage) === 'video' ? (
        <video controls style={{ width: '100%' }}>
          <source src={mainImage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </div>
  );
};

export default MainImage;
