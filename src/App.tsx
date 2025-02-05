import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/home";
import Movie from "./pages/movie";

const App = () => {
	return (
		<Router>
			<HelmetProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movie/:movieId" element={<Movie />} />
				</Routes>
				<Toaster richColors theme="light" position="top-center" />
			</HelmetProvider>
		</Router>
	);
};

export default App;
