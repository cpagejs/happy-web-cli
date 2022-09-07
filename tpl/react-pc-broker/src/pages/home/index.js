import React from "react";
import MainLayout from "@/layout/mainLayout";
import { translate } from "@/utils/lang";

export default function Home() {

	return (
		<MainLayout>
			{ translate("开始") }
		</MainLayout>
	);
}