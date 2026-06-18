import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TutorialsPage() {
	const [tutorials, setTutorials] = useState([]);
	const [tags, setTags] = useState([]);
	const [selectedTag, setSelectedTag] = useState("");

	useEffect(() => {
		loadTutorials();
		loadTags();
	}, []);
				
	const loadTutorials = async (tagName = "") => {
		let url = "";

		if (tagName) {
			url = `/tutorials?tag=${tagName}`;
		} else {
			url = "/tutorials";
		}

		try {
			const response = await api.get(url);
			setTutorials(response.data);
		} catch (error) {
			console.error("Error cargando tutoriales:", error);
		}
	};

	const deleteTutorial = async (id ) => {
		await api.delete(`/tutorials/${id}`);
		loadTutorials(selectedTag);
	};

	const loadTags = async () => {
		const response = await api.get("/tags");
		setTags(response.data);
	};

	return (
		<div>
			<Link to="/create-tutorial">Crear Tutorial</Link>
			<Link to="/tags">Administrar etiquetas</Link>
			<h1>Tutoriales</h1>
			<div>
				<label htmlFor="filter-tags">Filtrar por etiqueta: </label>
				<select id="filter-tags" name="filterTags" value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}>
				
					<option value="">Todas las etiquetas</option>
					{tags.map((tag) => (
						<option key={tag.id} value={tag.name}> {tag.name} </option>
					))}
				</select>
			
				<button onClick={() => loadTutorials(selectedTag)}>Filtrar</button>
           
		    </div>
		
			{tutorials.map((tutorial) => (
				<div key={tutorial.id}>
					<h3>{tutorial.title}</h3>
					<p>{tutorial.description}</p>

					<ul>
						{tutorial.tags.map((item) => (
							<li key={item.tag.id}>
								{item.tag.name}
							</li>
						))}
					</ul>
				
					<button onClick={() => deleteTutorial(tutorial.id)}>Borrar</button>
				
				</div>
			))}
		</div>
	);
}

export default TutorialsPage;