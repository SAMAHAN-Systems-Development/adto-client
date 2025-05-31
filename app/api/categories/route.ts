import { mockCategories } from "@/lib/mock/mockCategories";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		if (!mockCategories || mockCategories.length === 0) {
			return NextResponse.json(
				{ error: "No categories found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(mockCategories, { status: 200 });
	} catch (error) {
		console.error("Error in /api/categories:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
