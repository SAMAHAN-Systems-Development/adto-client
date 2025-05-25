"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OrganizationCardProps {
	borderColor: string;
	organizationImage?: string;
	organizationName: string;
	numberOfEvents: number;
	href: string;
}

export default function OrganizationCard({
	borderColor,
	organizationImage,
	organizationName,
	numberOfEvents,
	href,
}: OrganizationCardProps) {
	const placeholderImage = "/images/Avatar.png"; // Temporary; Change this to the final placeholder

	return (
		<Link href={href}>
			<div
				className={`flex items-center space-x-4 bg-white rounded-lg shadow px-4 py-3 border-l-[1rem] lg:border-l-[1.5rem] 2xl:border-l-[2rem] ${borderColor}`}
			>
				<div className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 relative flex-shrink-0">
					<Image
						src={organizationImage || placeholderImage}
						alt={organizationName}
						fill
						className="rounded-full object-cover"
					/>
				</div>
				<div>
					<p className="font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl">
						{organizationName}
					</p>
					<p className="text-gray-500 text-xs lg:text-sm xl:text-base 2xl:text-lg">
						{numberOfEvents} Events
					</p>
				</div>
			</div>
		</Link>
	);
}
