'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {userProperty} from '../../data/property';
import {useAppSelector} from '@/redux/hooks';
import {selectUser} from '@/redux/features/auth/authSlice';
import {useGetAllPropertiesQuery} from '@/redux/features/property/propertyManagementApi';
import {IProperty} from '@/types/property.types';
import MyProperty from '@/app/components/dashboard/property/MyProperty';
import DashboardLoader from '@/app/components/Loader/DashboardLoader';

export default function Page() {
	const user = useAppSelector(selectUser);
	const {data, isLoading} = useGetAllPropertiesQuery(undefined);
	const userProperty = data?.filter((property: any) => property.user === user?.id) || [];
	console.log('🚀🚀 ~ Page ~ userProperty:', userProperty);
	if (isLoading) {
		return <DashboardLoader />;
	}
	return (
		<>
			<div className="container-fluid">
				<div className="dashboard-wraper">
					<div className="form-submit mb-4">
						<h4>My Property</h4>
					</div>

				
						<div className="row">
							{userProperty.map((item: IProperty, index: number) => {
								return <MyProperty key={index} item={item} />;
							})}
						</div>
				
				</div>
			</div>
		</>
	);
}
