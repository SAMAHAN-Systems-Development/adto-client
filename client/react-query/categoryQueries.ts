import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryService";

export const useGetCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => getCategories(),
	});
};
