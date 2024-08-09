import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx'; 
import styles from './styles.module.scss'; 

interface TimeLineProps {
  className?: string; // Optional custom classes for the button
  style?: CSSProperties; // Optional custom styles for the button
  children: ReactNode; // Children elements
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | string;
}

const TimeLine: React.FC<TimeLineProps> = ({
  className, // Custom classes for the button
  style, // Custom styles for the button
  children,
  variant, // for line color
}) => { 
  const bgLineColor = variant ? styles[`timeline--${variant}`] : ''; // css integrate infima color
  
  return (
    <div className={clsx(styles.timeline, bgLineColor, className)} style={style}>
      {children}
    </div>
  );
};

export default TimeLine;
