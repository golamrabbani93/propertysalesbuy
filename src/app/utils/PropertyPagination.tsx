import React, {useEffect, useState} from 'react';
import Link from 'next/link';

type Property = {
	id: number;
	// other property fields...
};

type Props = {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalPages: number;
};

export default function PropertyPagination({currentPage, setCurrentPage, totalPages}: Props) {
	// Generate page numbers to display (simple version)
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	// Handler for page click
	const handlePageClick = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	return (
		<>
			{/* Render current page items */}

			{/* Pagination controls */}
			<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12">
					<ul className="pagination p-center">
						<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
							<Link
								href="#"
								className="page-link"
								aria-label="Previous"
								onClick={(e) => {
									// e.preventDefault();
									handlePageClick(currentPage - 1);
								}}
							>
								<i className="fa-solid fa-arrow-left-long"></i>
								<span className="sr-only">Previous</span>
							</Link>
						</li>

						{/* Show first page */}
						{currentPage > 3 && (
							<li className="page-item">
								<Link
									href="#"
									className="page-link"
									onClick={(e) => {
										// e.preventDefault();
										handlePageClick(1);
									}}
								>
									1
								</Link>
							</li>
						)}

						{/* Show ellipsis if currentPage > 4 */}
						{currentPage > 4 && (
							<li className="page-item disabled">
								<span className="page-link">...</span>
							</li>
						)}

						{/* Show pages around current page */}
						{pageNumbers
							.filter((page) => page >= currentPage - 2 && page <= currentPage + 2)
							.map((page) => (
								<li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
									<Link
										href="#"
										className="page-link"
										onClick={(e) => {
											// e.preventDefault();
											handlePageClick(page);
										}}
									>
										{page}
									</Link>
								</li>
							))}

						{/* Show ellipsis if currentPage < totalPages - 3 */}
						{currentPage < totalPages - 3 && (
							<li className="page-item disabled">
								<span className="page-link">...</span>
							</li>
						)}

						{/* Show last page */}
						{currentPage < totalPages - 2 && (
							<li className="page-item">
								<Link
									href="#"
									className="page-link"
									onClick={(e) => {
										// e.preventDefault();
										handlePageClick(totalPages);
									}}
								>
									{totalPages}
								</Link>
							</li>
						)}

						<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
							<Link
								href="#"
								className="page-link"
								aria-label="Next"
								onClick={(e) => {
									// e.preventDefault();
									handlePageClick(currentPage + 1);
								}}
							>
								<i className="fa-solid fa-arrow-right-long"></i>
								<span className="sr-only">Next</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
