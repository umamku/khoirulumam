

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import AdminPage from './components/AdminPage';
import LinkDetail from './components/LinkDetail';
import PortfolioDetail from './components/PortfolioDetail';
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/admin" element={<AdminPage />} />
			<Route path="/link/:id" element={<LinkDetail />} />
			<Route path="/portfolio/:id" element={<PortfolioDetail />} />
			<Route path="/*" element={<App />} />
		</Routes>
	</BrowserRouter>
);
