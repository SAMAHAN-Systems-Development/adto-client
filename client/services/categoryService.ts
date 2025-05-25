import { BASE_URL } from "../config";

const ENDPOINT_URI = "api/categories";

export const getCategories = async () => {
	try {
		const url = `${BASE_URL}/${ENDPOINT_URI}`;
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!res.ok) {
			let errorMessage = `Failed to fetch categories: ${res.statusText}`;
			if (res.status === 404) {
				errorMessage = "Categories not found";
			} else if (res.status === 500) {
				errorMessage = "Server error while fetching categories";
			}
			throw new Error(errorMessage);
		}

		return res.json();
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error instanceof Error
			? error
			: new Error("Network error: Failed to fetch categories");
	}
};
