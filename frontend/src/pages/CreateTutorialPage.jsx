import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function CreateTutorialPage(){
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		loadTags();
	}, []);

	const loadTags = async () => {
		const response = await api.get("/tags");
		setTags(response.data);
	};

	const handleSubmit = async (e) => { 
		e.preventDefault();
		
		await api.post("/tutorials", { title, description, tagIds: selectedTags,

		});
		navigate("/");
	};

	const handleTagChange = (e) => {
		const values = Array.from(
			e.target.selectedOptions
		).map((option) => Number(option.value));

		setSelectedTags(values);
	};

	return (
		<div>
			<h1>Crear tutorial</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<input placeholder="Título" value={title} 
						onChange={(e) => setTitle(e.target.value)}/>
				</div>
				<div>
					<textarea placeholder="Descipción" value={description}
						onChange={(e) => setDescription(e.target.value)}/>
				</div>
				<div>
					<select multiple onChange={handleTagChange}>
						{tags.map((tag) => (
							<option
								key={tag.id}
								value={tag.id} 
								>
									{tag.name}
							</option>
						))}
					</select>
				</div>
				<button type="submit">Guardar</button>
			</form>
		</div>
	);
}

export default CreateTutorialPage;