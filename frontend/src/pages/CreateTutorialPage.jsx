import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTutorialPage.css";
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

	// trae las etiquetas
	const loadTags = async () => {
		const response = await api.get("/tags");
		setTags(response.data);
	};

	// guarda el tutorial
	const handleSubmit = async (e) => { 
		e.preventDefault();
		
		await api.post("/tutorials", { title, description, tagIds: selectedTags,

		});
		navigate("/");
	};

	// guarda tags seleccionados
	const handleTagChange = (e) => {
		const values = Array.from(
			e.target.selectedOptions
		).map((option) => Number(option.value));

		setSelectedTags(values);
	};

	return (
		<div className="container">
			<h1>Crear tutorial</h1>
			<form  className="form" onSubmit={handleSubmit}>
				<div>
					<input placeholder="Título" value={title} 
						onChange={(e) => setTitle(e.target.value)}/>
				</div>
				<div>
					<textarea className="textarea" placeholder="Descipción" value={description}
						onChange={(e) => setDescription(e.target.value)}/>
				</div>
				<div>
					<select className="select" multiple onChange={handleTagChange}>
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
				<button className="button" type="submit">Guardar</button>
			</form>
		</div>
	);
}

export default CreateTutorialPage;