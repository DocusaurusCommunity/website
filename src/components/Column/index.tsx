import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx'; 
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

interface ColumnProps {
  children: ReactNode;
  elementClass?: string;
  gridClass?: string;
  style?: CSSProperties;
}

export default function Column({ children, elementClass, gridClass, style }: ColumnProps) {
  return (
    <MDXContent>
      <div className={clsx('col', gridClass)}>
        <div className={clsx('col-demo', elementClass)} style={style}>
          {children}
        </div>
      </div>
    </MDXContent>
  );
}
