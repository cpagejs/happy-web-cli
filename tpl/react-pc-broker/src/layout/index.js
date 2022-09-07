import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";
import { Routes, Route } from "react-router-dom";
import { reduceMenuList } from "@/utils";
import menuRoutes from "@/config/menuRoutes";
import HomePage from "@/pages/home";
import NotFound from "@/pages/404";
import NavMenu from "./navMenu";
import "./index.less";

export default function AdminLayout() {
  const { Content } = Layout;
  const authRoutes = reduceMenuList(menuRoutes)
		.map(item => {
			item.path = item.key;
			return item;
		})
		.filter(item => item.component);

	return (
		<Layout className="my-layout-body">
			<NavMenu />
			<Layout className="layout-content-wrap reset-padding">
				<Header />
				<Content className="layout-content-body">
					<Routes>
						<Route path="/" element={<HomePage />} />
						{/* <Route key="/home" path="/home" element={<HomePage />} /> */}
						{authRoutes.map(item => <Route key={item.key}  {...item} element={<item.component/>}/>)}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Content>
				{<Footer />}
			</Layout>
		</Layout>
	);
}



