'use client';

import React, {useEffect} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';

interface PSBFormProps {
	children: React.ReactNode;
	onSubmit: (data: any, methods?: any) => void;
	defaultValues?: Record<string, any>;
	resolver?: any;
}

export default function PSBForm({children, onSubmit, defaultValues, resolver}: PSBFormProps) {
	// Initialize the form with resolver and default values
	const methods = useForm({
		defaultValues,
		resolver,
	});

	// Reset form whenever defaultValues changes
	useEffect(() => {
		if (defaultValues) {
			methods.reset(defaultValues); // Reset with new default values
		}
	}, [defaultValues]);

	const submit = (data: FieldValues) => {
		onSubmit(data, methods);
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(submit)}>{children}</form>
		</FormProvider>
	);
}
