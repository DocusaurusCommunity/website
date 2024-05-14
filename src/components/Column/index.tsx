import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx'; 
import styles from './styles.module.scss';

interface ColumnProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Column({ children, className, style }: ColumnProps) {
  return (
   
      <div className={clsx('col', className)}  style={style}>
          {children}
      </div>
  
  );
}
