import React,  { CSSProperties } from 'react';
import clsx from 'clsx'; // Assurez-vous d'avoir clsx installé et importé correctement

const CardHeader = ({
  className, // Classes personnalisées pour le composant
  style, // Styles personnalisés pour le composant
  children, // Contenu du composant
  textAlign, // Alignement du texte (par ex. 'left', 'center', 'right')
  variant,
  italic = false , 
  noDecoration = false, 
  transform, 
  breakWord = false, 
  truncate = false, 
  weight,
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
    <div className={clsx('card__header',className, text, textType, textColor, textItalic, textDecoration, textBreak, textTruncate, textWeight)} style={style} >
    
    {children}
  </div>
  );
}


export default CardHeader ;
