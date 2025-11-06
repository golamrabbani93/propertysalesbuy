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
import DashboardLoader from '../Loader/DashboardLoader';
import {useDeleteUserMutation, useGetAllUsersQuery} from '@/redux/features/user/userManagementApi';
import {catchAsync} from '@/utils/catchAsync';
import {toast} from 'sonner';
import DeleteModal from '../dashboard/modal/delete-modal/DeleteModal';

interface User {
	id: number;
	role: string;
	name: string;
	phone: string;
	email: string;
	user_type: string | null;
	password: string;
	address: string | null;
	image: string | null;
	created_at: string;
}

export default function UserTable(): JSX.Element {
	const {data, isLoading} = useGetAllUsersQuery(''); // ✅ Replace with your API hook
	const [deleteUser, {isLoading: deleteLoading}] = useDeleteUserMutation();
	// ✅ Always safe array
	const userData: User[] = useMemo(() => (data ? data : []), [data]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

	//delete user function
	const handleDeleteUser = (userId: number) => {
		setUserIdToDelete(userId);
		setShowDeleteModal(true);
	};
	const handleDelete = async () => {
		catchAsync(async () => {
			const res = await deleteUser(userIdToDelete);
			if (res) {
				toast.success('User Delete SuccessFully');
				setShowDeleteModal(false);
			} else {
				toast.error('User Delete Failed');
			}
		});
	};
	// ✅ Columns
	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			// {header: 'ID', accessorKey: 'id'},

			{header: 'Name', accessorKey: 'name'},
			{header: 'Email', accessorKey: 'email'},
			{header: 'Phone', accessorKey: 'phone'},

			{
				header: 'Role',
				accessorKey: 'role',
				cell: ({getValue}) => (
					<span className={`badge bg-${getValue() === 'admin' ? 'danger' : 'primary'}`}>
						{String(getValue()).toUpperCase()}
					</span>
				),
			},

			{
				header: 'Seller Type',
				accessorKey: 'user_type',
				cell: ({getValue}) => <span>{String(getValue() || 'N/A')}</span>,
			},

			{
				header: 'Address',
				accessorKey: 'address',
				cell: ({getValue}) => <span>{(getValue() as string) || 'N/A'}</span>,
			},
			//add delete user button
			{
				header: 'Actions',
				accessorKey: 'delete',
				cell: ({row}) => (
					<button
						className="btn btn-sm btn-danger"
						onClick={() => handleDeleteUser(row.original.id)}
					>
						Delete
					</button>
				),
			},
		],
		[],
	);

	// ✅ Search
	const filteredData = useMemo(
		() =>
			userData.filter(
				(row: User) =>
					row.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
					row.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
					row.phone.toLowerCase().includes(globalFilter.toLowerCase()),
			),
		[globalFilter, userData],
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

	if (isLoading) return <DashboardLoader />;

	return (
		<div className="container mt-4 overflow-scroll" style={{scrollbarWidth: 'none'}}>
			{/* Search & Size */}
			<div className="mb-3 d-flex gap-2 flex-wrap">
				<input
					type="text"
					className="form-control"
					placeholder="Search by Name / Email / Phone..."
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
			<DeleteModal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
				loading={deleteLoading}
				text="User"
			/>
			{/* Table */}
			<table className="table table-bordered table-hover">
				<thead className="table-light">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									className="cursor-pointer"
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
					{table.getRowModel().rows.length ? (
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
								No users found
							</td>
						</tr>
					)}
				</tbody>
			</table>

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
