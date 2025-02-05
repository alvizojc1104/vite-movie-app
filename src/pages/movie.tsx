/* eslint-disable react-hooks/exhaustive-deps */
import { CardDescription } from "@/components/ui/card";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export type TMovie = {
	id: number;
	url: string;
	imdb_code: string;
	title: string;
	title_english: string;
	title_long: string;
	slug: string;
	year: number;
	rating: number;
	runtime: number;
	background_image: string;
	background_image_original: string;
	date_uploaded: string;
	date_uploaded_unix: number;
	description_full: string;
	description_intro: string;
	genres: string[];
	language: string;
	large_cover_image: string;
	like_count: number;
	medium_cover_image: string;
	mpa_rating: string;
	small_cover_image: string;
	torrents: Array<{
		url: string;
		quality: string;
		size: string;
		seeds: number;
		peers: number;
		hash: string;
		peer_id: string;
		peer_port: number;
	}>;
	yt_trailer_code: string;
};

export default function Movie() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState<TMovie | null>(null);

	useEffect(() => {
		axios
			.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
			.then((response) => {
				setMovie(response.data.data.movie);
			})
			.catch((err) => {
				alert(JSON.stringify(err));
			});

		return () => {};
	}, []);

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			{!movie ? (
				<Loader2 className="animate-spin" />
			) : (
				<div>
					<Link to={"/"} className="flex gap-1 hover:underline self-start p-1 px-8 rounded-md w-fit">
						<ArrowLeft />
						<p>Back</p>
					</Link>
					<div className="flex gap-4 justify-center pt-6 px-8 w-fit max-w-4xl">
						<img
							src={movie.large_cover_image}
							className="w-60 h-80 object-contain"
							alt="image"
						/>
						<div className="flex flex-col gap-2">
							<h1>{movie.title}</h1>
							<p className="text-sm">
								{movie.description_full
									? movie.description_full
									: "No description."}
							</p>
							<CardDescription>
								Genre:{" "}
								{movie.genres.map((item, index) => {
									return (
										<span
											key={index}
											className="italic text-xs"
										>
											{item}
											{index < movie.genres.length - 1 &&
												", "}
										</span>
									);
								})}
							</CardDescription>
							<CardDescription>
								Rating: {movie.rating}{" "}
								<span className="text-yellow-400">★</span>
							</CardDescription>
							<Link
								to={movie.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<p className="underline text-blue-500 text-sm">
									Download
								</p>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
