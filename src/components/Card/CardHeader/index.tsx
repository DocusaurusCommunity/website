import React,  { CSSProperties } from 'react';
import clsx from 'clsx';

const CardHeader = ({
  className, // Custom CSS classes for the component
  style, // Custom CSS styles for the component
  children, // The content of the component
  textAlign, // Text alignment
  variant, // Text color variant
  italic = false, // Italic text
  noDecoration = false, // No text decoration 
  transform, // Text transformation
  breakWord = false, // Break word
  truncate = false, // Truncate text
  weight, // Text weight
}) => {   
  const text = textAlign ? `text--${textAlign}` :'';
  const textColor = variant ? `text--${variant}` : '';
  const textItalic = italic ? 'text--italic' : '';
  const textDecoration = noDecoration ? 'text-no-decoration' : '';
  const textType = transform ? `text--${transform}` : '';
  const textBreak = breakWord ? 'text--break' : '';
  const textTruncate = truncate ? 'text--truncate' : '';
  const textWeight = weight ? `text--${weight}` : '';
  return (
    <div className={clsx('card__header', className, text, textType, textColor, textItalic, textDecoration, textBreak, textTruncate, textWeight)} style={style} >
      {children}
    </div>
  );
}

export default CardHeader;
