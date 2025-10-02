import clsx from 'clsx';
import React from 'react';

import * as styles from './Button.module.scss';

export interface ButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  onClick: (value: any) => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, icon: Icon }) => {
  return (
    <button
      className={clsx(styles.button, Icon && !children && styles.iconButton)}
      onClick={onClick}
    >
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
