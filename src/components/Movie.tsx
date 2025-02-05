import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TMovie = {
	id: string;
	coverImage: string;
	title: string;
	rating: number;
	description: string;
	genres: Array<string>;
};

const Movie = ({ coverImage, title, rating, genres, id }: TMovie) => {
	return (
		<Card className="sm:max-w-md md:max-w-xl lg:max-w-2xl h-80 cursor-pointer transition-colors hover:bg-slate-100" key={id}>
			<CardContent className="h-full">
				<CardHeader>
					<img
						src={coverImage}
						alt="image"
						className=" max-w-xl h-40 object-contain"
					/>
				</CardHeader>
				<CardTitle className="text-sm">{title}</CardTitle>
				<div className="flex gap-2 text-wrap">
					<p className="text-xs mt-1 truncate">Genre: {genres.map((item, index)=>{return(<span key={index} className="italic">{item} </span>)})}</p>
				</div>
				<p className=" text-xs">Rating: {rating}</p>
			</CardContent>
		</Card>
	);
};

export default memo(Movie);
