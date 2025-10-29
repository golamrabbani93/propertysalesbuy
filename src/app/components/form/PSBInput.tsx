'use client';

import React from 'react';
import {useFormContext} from 'react-hook-form';

interface PSBInputProps {
	type: string;
	label: string;
	name: string;
	placeholder?: string;
	isReadOnly?: boolean;
	disabled?: boolean;
}
export default function PSBInput({
	type,
	label,
	name,
	isReadOnly = false,
	placeholder,
	disabled = false,
}: PSBInputProps) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<label className="mb-2">{label}</label>
			<input
				id={name}
				{...register(name)}
				type={type}
				placeholder={placeholder}
				readOnly={isReadOnly}
				disabled={disabled}
				className={`form-control`}
			/>
			{errors[name]?.message && (
				<span className="text-danger mt-1" style={{fontSize: '12px'}}>
					{String(errors[name]?.message)}
				</span>
			)}
		</div>
	);
}
