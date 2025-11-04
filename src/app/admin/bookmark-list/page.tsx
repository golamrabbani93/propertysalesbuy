'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import {bookMarkProperty} from '@/app/data/property';

interface Bookmark {
	image: string;
	name: string;
	loction: string;
	value: string;
}

export default function BookmarkList() {
	let [show, setShow] = useState<boolean>(false);
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-9 col-md-12">
						<div className="dashboard-wraper">
							<div className="form-submit">
								<h4>Bookmark Property</h4>
							</div>

							<table className="property-table-wrap responsive-table bkmark">
								<tbody>
									<tr>
										<th>
											<i className="fa fa-file-text"></i> Property
										</th>
										<th></th>
									</tr>
									{bookMarkProperty.map((item: Bookmark, index: number) => {
										return (
											<tr key={index}>
												<td className="property-container">
													<img src={item.image} alt="" />
													<div className="title">
														<h4>
															<Link href="#">{item.name}</Link>
														</h4>
														<span>{item.loction} </span>
														<span className="table-property-price">{item.value}</span>
													</div>
												</td>
												<td className="action">
													<Link href="#" className="delete">
														<i className="fa-solid fa-trash-can"></i> Delete
													</Link>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
