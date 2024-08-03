import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import styles from '../styles.module.scss';

interface TimelineItemProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  align?: 'left' | 'right' ;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | string;
  italic?: boolean;
  noDecoration?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  breakWord?: boolean;
  truncate?: boolean;
  weight?: 'light' | 'normal' | 'bold' |'semibold';
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | string;
  shadow?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  className, // Custom classes for the button
  style, // Custom styles for the button
  children, // Children elements
  align = 'left' , // position of item
  textAlign = 'justify', // text position
  variant = 'primary', // background color 
  italic = false ,  // style italic for text
  noDecoration = false, // style no text decoration
  transform,  // option for transform text to UPPERCASE TEXT lowercase text or Capitalize Text
  breakWord = false, //  option for break text, the text will break at the a word boundary so it will not break in the middle of a word.
  truncate = false, // The option is for very long text that will be truncated if there is not enough space to display it in a single line on the screen. It's truncated by adding...
  weight, // The option for text weight Bold Semibold Normal Light
  color, // text color 
  shadow = 'tl', // shadow option
}) => {
  const boxshadow = shadow ? `item shadow--${shadow}` : '';
  const bgcolor = variant ? styles[`timeline__content--${variant}`] : '';
  const itemalign = align ? styles[`timeline__item--${align}`] : '';
  const text = textAlign ? `text--${textAlign}` : '';
  const textColor = color ? `text--${color}` : '';
  const textItalic = italic ? 'text--italic' : '';
  const textDecoration = noDecoration ? 'text-no-decoration' : '';
  const textType = transform ? `text--${transform}` : '';
  const textBreak = breakWord ? 'text--break' : '';
  const textTruncate = truncate ? 'text--truncate' : '';
  const textWeight = weight ? `text--${weight}` : '';

  return (
    <div className={clsx(styles.timeline__item, itemalign)}>
      <div
        className={clsx(
          styles.timeline__content,
          bgcolor,
          className,
          boxshadow,
          text,
          textType,
          textColor,
          textItalic,
          textDecoration,
          textBreak,
          textTruncate,
          textWeight
        )}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default TimelineItem;
