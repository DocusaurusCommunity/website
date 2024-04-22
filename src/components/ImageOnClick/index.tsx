import React, { useState } from 'react'; // Import React and useState hook
import clsx from 'clsx'; // Import clsx library for conditional classes
import useBaseUrl from '@docusaurus/useBaseUrl'; // Import the useBaseUrl function from Docusaurus
import styles from './styles.module.scss'; // Import styles from SCSS module

// Define the type for props passed to the ImageOnClick component
interface ImageOnClickProps {
  imageUrl: string; // URL of the image
  altText: string; // Alternative text for the image
  buttonName: string; // Name of the button to show/hide the image
}

// Define the ImageOnClick component as a functional component
const ImageOnClick: React.FC<ImageOnClickProps> = ({ imageUrl, altText, buttonName }) => {
  const [showImg, setShowImg] = useState(false); // State to track whether image should be shown or hidden

  const generatedImageUrl = useBaseUrl(imageUrl); // Use the useBaseUrl function to generate the image URL

  return (
    <span>
      {/* Button to toggle visibility of the image */}
      <a onClick={() => setShowImg(!showImg)} className={styles.cursor}>
        {buttonName}  
      </a>
      {/* Conditionally render the image if showImg is true */}
      {showImg && (
        <span className={styles.imageonclick}>
          {/* Image element */}
          <img src={generatedImageUrl} alt={altText} /> 
        </span>
      )}
    </span>
  );
}

export default ImageOnClick; // Export the ImageOnClick component
