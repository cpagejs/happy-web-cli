import React from "react";
import { Button } from "antd-mobile";
import { Routes, Route } from "react-router-dom";
import { useIntl } from 'react-intl';

function Home() {
	const intl = useIntl();

	return (
		<>
			<div>home--{intl.formatMessage({ id: '开始' })}</div>
		</>
	);
}

function About() {
	return (
		<>
			<div>About</div>
		</>
	);
}

export default function App() {
	const intl = useIntl();
	return (
		<>
			<Button color='primary'>antd-mobild btn-{intl.formatMessage({ id: '切换' })}</Button>
			<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
		</>
	);
}