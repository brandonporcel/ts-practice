import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Link,
	Select,
	Stack,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
interface VideoType {
	type: string;
	id?: number;
	url: string;
	title: string;
}
type Parsero = {
	data: Array<VideoType>;
};
export default function Home() {
	const initialState = { url: '', type: '', title: '' };
	const [form, setForm] = useState<VideoType>(initialState);

	const [cosos, setCosos] = useState<VideoType[]>([]);
	const [loading, setLoading] = useState(true);

	// api
	useEffect(() => {
		const getData = async () => {
			const data = await fetch(
				'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOjWkR2tEt46kpQ4kIH5qVuPEus4v2X3QQQfMpy9K3hQGv_Brg0pQEY71mK7sxiOnN9FmWLC6-rIF-/pub?output=csv'
			);
			const resp = await data.text();
			const parsed: Parsero = await new Promise((resolve, reject) => {
				Papa.parse(resp, { header: true, complete: resolve, error: reject });
			});

			setCosos(parsed.data);
			setLoading(false);
		};
		getData();
	}, []);
	const [galleryVideo, setGalleryVideo] = useState(0);

	const prevVid = () => {
		galleryVideo === 0
			? setGalleryVideo(cosos?.length - 1)
			: setGalleryVideo((galleryVideo) => galleryVideo - 1);
	};
	const nextVid = () => {
		galleryVideo === cosos?.length - 1
			? setGalleryVideo(0)
			: setGalleryVideo((galleryVideo) => galleryVideo + 1);
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const addNew = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCosos([...cosos, { ...form, id: cosos?.length }]);
	};
	return (
		<>
			<Stack width={'100%'} height={'100vh'} overflowX={'hidden'}>
				{loading ? (
					<p>cargandro...</p>
				) : cosos[galleryVideo]?.type === 'img' ? (
					<Stack
						className="appear marquee"
						height={'100%'}
						backgroundRepeat={'no-repeat'}
						backgroundSize={'cover'}
						backgroundPosition={'center'}
						position={'relative'}
						style={{ backgroundImage: `url(${cosos[galleryVideo]?.url})` }}
					>
						<Stack
							className="marqueeSon"
							position={'absolute'}
							style={{ backgroundImage: `url(${cosos[galleryVideo]?.url})` }}
						></Stack>
						<small style={{ color: 'white' }}>
							{cosos[galleryVideo].title}
						</small>
					</Stack>
				) : (
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${cosos[galleryVideo]?.url}`}
						title="YouTube video playerrrrr"
						style={{ border: '0' }}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					></iframe>
				)}
			</Stack>

			<Stack p="4">
				<Stack>
					<Button mt={4} colorScheme="teal" type="button" onClick={prevVid}>
						⬅
					</Button>
					<Button mt={4} colorScheme="teal" type="button" onClick={nextVid}>
						➡
					</Button>
				</Stack>

				<form onSubmit={(e) => addNew(e)}>
					<FormControl marginTop={5}>
						<FormLabel fontSize={20}>Title</FormLabel>
						<Input
							type="text"
							placeholder="Messi World Cup Final"
							name="title"
							required
							value={form.title}
							onChange={(e) => handleChange(e)}
						/>
					</FormControl>
					<FormControl marginTop={5}>
						<FormLabel fontSize={20}>Url</FormLabel>
						<Input
							type="text"
							placeholder="TWOEYOWkGSs"
							name="url"
							required
							value={form.url}
							onChange={(e) => handleChange(e)}
						/>
					</FormControl>
					<FormControl marginTop={5}>
						<FormLabel fontSize={20}>Type</FormLabel>
						<Select
							required
							placeholder="Tipo link"
							value={form.type}
							name="type"
							onChange={(e) => handleChange(e)}
						>
							<option value="yt">youtube</option>
							<option value="img">image</option>
						</Select>
					</FormControl>
					<Button mt={4} colorScheme="teal" type="submit">
						Submit
					</Button>
					<Stack>
						<a
							className="grad"
							href="https://docs.google.com/spreadsheets/d/1QI9BNWenfF4UeQYPa-KDhJp6epI1xB0_Io-Spq6pIwY/edit?usp=sharing"
							target="_blank"
						>
							Excel
						</a>
					</Stack>
				</form>
			</Stack>
		</>
	);
}
