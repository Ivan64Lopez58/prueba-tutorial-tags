import { useEffect, useState } from "react";
import api from "../services/api";

function TagsPage() {
	const [tags, setTags] = useState([]);
	const [name, setName] = useState("");

	useEffect(() => {
		loadTags();
	}, []);

	const loadTags = async () => {
		const response =
			await api.get("/tags");

		setTags(response.data);
	};

	const createTag = async () => {
		await api.post("/tags", {
			name,
		});

		setName("");
		loadTags();
	};

	return (
		<div>
			<h1>Etiquetas</h1>
			<label htmlFor="tagName">Nombre de la etiqueta </label>
			<input
				id="tagName"
				name="tagName"
				value={name}
				onChange={(e) => setName(e.target.value)}/>

			<button onClick={createTag}> Añadir etiqueta</button>
			
			<ul>
				{tags.map((tag) => (
					<li key={tag.id}>
						{tag.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TagsPage;