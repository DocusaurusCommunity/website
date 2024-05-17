import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type ColorPreview = {
  color: string;
  label?: string;
}

export default function ColorPreview ({ color, label } : ColorPreview) {
    const style : CSSProperties = {
        alignSelf: 'center',
        backgroundColor: color,
    };
    const colorName = label ?? color;
    return (
        <div className='text--center'>
            <span className={clsx('text--center', styles.color)} style={style}></span><br />
            <span className='text-center'>{colorName}</span>
        </div>
    );
}
