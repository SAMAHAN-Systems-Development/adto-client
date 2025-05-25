import { create } from "zustand";
import { getCategories } from "../services/categoryService";

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

interface CategoryState {
	categories: ICategory[];
	loading: boolean;
	error: string | null;
	showAllByCategory: { [categoryId: number]: boolean };
	fetchCategories: () => Promise<void>;
	toggleShowAll: (categoryId: number) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
	categories: [],
	loading: false,
	error: null,
	showAllByCategory: {},

	fetchCategories: async () => {
		set({ loading: true, error: null });
		try {
			const response = await getCategories();
			set({ categories: response, loading: false });
			console.log(response);
		} catch (error) {
			set({
				error: "Failed to load categories. Please try again.",
				loading: false,
			});
			console.error("Error fetching categories:", error);
		}
	},
	toggleShowAll: (categoryId) =>
		set((state) => ({
			showAllByCategory: {
				...state.showAllByCategory,
				[categoryId]: !state.showAllByCategory[categoryId],
			},
		})),
}));
