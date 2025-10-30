import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: 'primary' | 'secondary' | 'danger';
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	className = '',
	...props
}) => {
	return (
		<button className={`btnm btnm-${variant} ${className} bg-primary`} {...props}>
			{children}
		</button>
	);
};

export default Button;
