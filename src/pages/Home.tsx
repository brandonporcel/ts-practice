import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Stack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
interface IUser {
	link: string;
	type: string;
	id?: Date;
}
export default function Home() {
	const initialState = { link: '', type: 'yt' };
	const [form, setForm] = useState<IUser>(initialState);
	const [cosos, setCosos] = useState([
		{
			link: 'sdasd',
		},
	]);
	// const ytIframe = useRef(null);
	// console.log(ytIframe.current?.allowfullscreen, 'a');

	const handleChange = (e: any) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const addNew = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCosos([...cosos, form]);
	};
	return (
		<>
			<Stack width="100" background={'gray'} height="100vh">
				<iframe
					width="100%"
					height="100%"
					src="https://www.youtube.com/embed/EgDQMPyOlbM"
					title="YouTube video playerrrrr"
					style={{ border: '0' }}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					data-allowfullscreen
				></iframe>

				{cosos.map((el) => {
					return <p>{el.link}</p>;
				})}
			</Stack>
			<form onSubmit={(e) => addNew(e)}>
				<FormControl>
					<FormLabel>Link</FormLabel>
					<Input
						type="text"
						placeholder="https"
						name="link"
						required
						value={form.link}
						onChange={(e) => handleChange(e)}
					/>
					<FormControl>
						<FormLabel>Type</FormLabel>
						<Select
							required
							placeholder="Tipo link"
							value={form.type}
							name="type"
							onChange={(e) => handleChange(e)}
						>
							<option value="tw">tw</option>
							<option value="yt">yt</option>
						</Select>
					</FormControl>
					<Button mt={4} colorScheme="teal" type="submit">
						Submit
					</Button>
				</FormControl>
			</form>
		</>
	);
}
