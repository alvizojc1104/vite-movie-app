import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
			</HelmetProvider>
		</Router>
	);
};

export default App;
