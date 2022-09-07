import React, { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/utils/auth";

export default function MainLayout(props) {
	const navigate = useNavigate();
	if(!getUserInfo()) {
		navigate('/login');
	}

	return (
		<Layout>
			<div className="body-layout">
				{props.children}
			</div>
		</Layout>
	);
}