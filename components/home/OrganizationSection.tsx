"use client";
import { useCategoryStore } from "@/client/store/categoryStore";
import OrganizationCard from "@/components/OrganizationCard";
import React, { useEffect } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface ICategory {
	id: number;
	categoryName: string;
	organizations: IOrganization[];
}

interface IOrganization {
	id: number;
	organizationImage?: string;
	organizationName: string;
	numberOfEvents: number;
}

const OrganizationSection = () => {
	const {
		categories,
		loading,
		error,
		fetchCategories,
		showAllByCategory,
		toggleShowAll,
	} = useCategoryStore();

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<div className="flex justify-center items-center min-h-screen py-10">
			<div className="container">
				{loading && <p>Loading...</p>}
				{error && <p>Network error</p>}
				{!loading && !error && categories.length > 0 ? (
					<>
						{/* Categories */}
						{categories
							.filter(
								(category) =>
									category.organizations && category.organizations.length > 0
							)
							.map((category: ICategory) => (
								<div key={category.id} className="mb-10">
									<h2 className="text-lg font-semibold mb-4">
										{category.categoryName}
									</h2>
									{/* Organizations */}
									<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{(showAllByCategory[category.id]
											? category.organizations
											: category.organizations.slice(0, 6)
										).map((organization: IOrganization) => (
											<OrganizationCard
												key={organization.id}
												borderColor="border-l-red-500"
												organizationName={organization.organizationName}
												numberOfEvents={organization.numberOfEvents}
												href={`/organizations/${organization.id}/events`}
											/>
										))}
									</div>
									<div className="flex justify-end">
										{category.organizations.length > 6 &&
											!showAllByCategory[category.id] && (
												<button
													onClick={() => toggleShowAll(category.id)}
													className="flex hover:text-blue-800 mt-4"
												>
													See more
													<ChevronRightIcon
														width={20}
														height={20}
														className="text-black font-extrabold"
													/>
												</button>
											)}
										{category.organizations.length > 6 &&
											showAllByCategory[category.id] && (
												<button
													onClick={() => toggleShowAll(category.id)}
													className="flex hover:text-blue-800 mt-4"
												>
													See less
													<ChevronRightIcon
														width={20}
														height={20}
														className="text-black font-extrabold"
													/>
												</button>
											)}
									</div>
								</div>
							))}
					</>
				) : (
					!loading && !error && <p>No categories available.</p>
				)}
			</div>
		</div>
	);
};

export default OrganizationSection;
