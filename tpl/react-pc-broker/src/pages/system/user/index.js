import React from "react";
import MainLayout from "@/layout/mainLayout";
import { useIntl } from "react-intl";

export default function SystemUser() {
	const t = useIntl();

	return (
		<MainLayout>
			demo1--	{t.formatMessage({ id: '开始' })}
		</MainLayout>
	);
}