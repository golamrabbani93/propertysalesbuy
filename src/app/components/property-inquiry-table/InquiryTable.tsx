'use client';

import React, {useState, useMemo, JSX} from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	ColumnDef,
	flexRender,
	SortingState,
} from '@tanstack/react-table';
import InquiryDetailsModal from './InquiryDetailsModal';
import {useGetAllMessagesQuery} from '@/redux/features/sendMessage/sendMessageManagementApi';
import DashboardLoader from '../Loader/DashboardLoader';

// ✅ Your API Data
interface Inquiry {
	id: number;
	name: string;
	email: string;
	property_id: string;
	phone: string;
	subject: string;
	message: string;
	type: string;
	created_at: string;
}

export default function InquiryTable({type}: {type: string}): JSX.Element {
	const {data, isLoading} = useGetAllMessagesQuery('');
	//get only type order and show latest first
	const propertyData = useMemo(() => {
		if (!data) return [];
		return data
			.filter((item: Inquiry) => item.type === type)
			.sort((a: Inquiry, b: Inquiry) => (a.created_at < b.created_at ? 1 : -1));
	}, [data]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [selected, setSelected] = useState<Inquiry | null>(null);
	const [show, setShow] = useState(false);

	const handleSetModalData = (data: Inquiry) => {
		setSelected(data);
		setShow(true);
	};
	// ✅ Columns
	const columns = useMemo<ColumnDef<Inquiry>[]>(
		() => [
			{header: 'ID', accessorKey: 'id'},

			{header: 'Email', accessorKey: 'email'},

			{
				header: 'Phone',
				accessorKey: 'phone',
			},

			{
				header: 'Message',
				accessorKey: 'message',
				cell: ({getValue}) => <span>{String(getValue()).slice(0, 30)}...</span>,
			},
			//add a button to view full message
			{
				header: 'Action',
				cell: ({row}) => (
					<button className="btn btn-sm btn-info" onClick={() => handleSetModalData(row.original)}>
						View
					</button>
				),
			},
		],
		[],
	);

	// ✅ Search filter
	const filteredData = useMemo(
		() =>
			propertyData?.filter(
				(row: Inquiry) =>
					row.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
					row.phone.toLowerCase().includes(globalFilter.toLowerCase()) ||
					row.property_id.includes(globalFilter),
			),
		[globalFilter, propertyData],
	);

	// ✅ Table Setup
	const table = useReactTable({
		data: filteredData,
		columns,
		state: {sorting, pagination: {pageIndex, pageSize}},
		onSortingChange: setSorting,
		onPaginationChange: (updater) => {
			const next = typeof updater === 'function' ? updater({pageIndex, pageSize}) : updater;

			setPageIndex(next.pageIndex);
			setPageSize(next.pageSize);
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const totalPages = table.getPageCount();
	if (isLoading) {
		return <DashboardLoader />;
	}
	return (
		<div className="container mt-4 overflow-scroll" style={{scrollbarWidth: 'none'}}>
			{/* Search & page size */}
			<div className="mb-3 d-flex gap-2 flex-wrap">
				<input
					type="text"
					className="form-control"
					placeholder="Search by Email / Phone..."
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
				/>

				<select
					className="form-select w-auto"
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 20].map((size) => (
						<option key={size} value={size}>
							Show {size}
						</option>
					))}
				</select>
			</div>

			{/* Table */}
			<table className="table table-bordered table-hover">
				<thead className="table-light">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="cursor-pointer"
									onClick={header.column.getToggleSortingHandler()}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
									{{
										asc: ' 🔼',
										desc: ' 🔽',
									}[header.column.getIsSorted() as string] ?? null}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length} className="text-center py-3">
								No inquiries found
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<InquiryDetailsModal show={show} data={selected} onClose={() => setShow(false)} />
			{/* Pagination */}
			<div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
				<div>
					Page {pageIndex + 1} of {totalPages}
				</div>

				<div className="d-flex gap-1 align-items-center">
					<button
						className="btn btn-sm btn-primary"
						onClick={() => setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{'<<'}
					</button>

					<button
						className="btn btn-sm btn-primary"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{'<'}
					</button>

					<button
						className="btn btn-sm btn-primary"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{'>'}
					</button>

					<button
						className="btn btn-sm btn-primary"
						onClick={() => setPageIndex(totalPages - 1)}
						disabled={!table.getCanNextPage()}
					>
						{'>>'}
					</button>

					{/* Go to page */}
					<span className="ms-2">
						Go to page:{' '}
						<input
							type="number"
							className="form-control d-inline-block w-auto"
							value={pageIndex + 1}
							onChange={(e) => {
								const page = Number(e.target.value) - 1;
								setPageIndex(Math.max(0, Math.min(page, totalPages - 1)));
							}}
						/>
					</span>
				</div>
			</div>
		</div>
	);
}
