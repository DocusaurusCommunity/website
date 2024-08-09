import React, { ReactNode , CSSProperties} from 'react';
import clsx from 'clsx'; 

interface ColumnsProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Columns({ children,  className , style }: ColumnsProps) {
  return (
    <div className="container center">
      <div className={clsx('row', className)} style={style}>
        {children}
      </div>
    </div>
  );
}
