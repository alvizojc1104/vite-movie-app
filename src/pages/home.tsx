/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "@/components/Movie";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Home = () => {
	const [loading, setLoading] = useState<boolean>();
	const [movieList, setMovieList] = useState<Array<any> | null>();

	useEffect(() => {
		getMovies();
		return () => {};
	}, []);

	const getMovies = async () => {
		setLoading(true);
		await axios
			.get(
				`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
			)
			.then((response) => {
				setMovieList(response.data.data.movies);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<main>
			<div className="py-4 px-4 bg-blue-500 fixed w-[100%]">
				<div className="flex items-center gap-4 justify-between max-w-7xl mx-auto">
					<p className="font-bold text-center text-white">PinayMovies</p>
					<Input type="text" placeholder="Search" className="w-44" />
				</div>
			</div>
			{loading ? (
				<div className="w-full h-screen flex justify-center items-center gap-4">
					<Loader2 className="animate-spin" />
					<p>Loading...</p>
				</div>
			) : (
				<div className="grid max-w-7xl mx-auto px-4 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{movieList?.map((item) => {
						return (
							<Link to={`/movie/${item.id}`} key={item.id}>
								<Movie
									id={item.id}
									title={item.title}
									coverImage={item.medium_cover_image}
									rating={item.rating}
									description={
										item.summary ? item.summary : "None"
									}
									genres={item.genres}
								/>
							</Link>
						);
					})}
				</div>
			)}
		</main>
	);
};

export default Home;
