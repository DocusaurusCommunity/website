import React, { CSSProperties, ReactNode } from 'react'; // Import types for props
import clsx from 'clsx'; // clsx helps manage conditional class names in a clean and concise manner.

// Define an interface for the component props
interface CardProps {
  className?: string; // Optional class names for the container card
  style?: CSSProperties; // Optional custom styles for the container card
  children: ReactNode; // Content to be included within the card
  shadow?: 'lw' | 'md' | 'tl'; // Optional shadow levels: low (lw), medium (md), tall (tl)
}

// Build the card component with the specified props
const Card: React.FC<CardProps> = ({
  className, // Classes for the container card
  style, // Custom styles for the container card
  children, // Content to be included within the card
  shadow, // used to add shadow under your card. Expected values are: low (lw), medium (md), tall (tl)
}) => {
  const cardShadow = shadow ? `item shadow--${shadow}` : '';
  return (
    <div className={clsx("card", className, cardShadow)} style={style}>
      {children}
    </div>
  );
};

export default Card;
