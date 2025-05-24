"use client";
import NavigationBar from "@/components/ui/NavigationBar";
import HeroHeader from "@/components/home/HeroHeader";
import OrganizationSection from "@/components/home/OrganizationSection";

export default function Home() {
	return (
		<div>
			<NavigationBar />
			<HeroHeader />
			<OrganizationSection />
		</div>
	);
}
