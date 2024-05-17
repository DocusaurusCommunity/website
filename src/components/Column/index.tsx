import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx'; 
import MDXContent from '@theme/MDXContent';

interface ColumnProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Column({ children, className, style }: ColumnProps) {
  return (
    <MDXContent>
      <div className={clsx('col', className)}  style={style}>
          {children}
      </div>
    </MDXContent>
  );
}
