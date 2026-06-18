import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./TutorialsPage.css";

function TutorialsPage() {
	const [tutorials, setTutorials] = useState([]);
	const [tags, setTags] = useState([]);
	const [selectedTag, setSelectedTag] = useState("");

	useEffect(() => {
		loadTutorials();
		loadTags();
	}, []);

	// trae tutoriales con o sin filtro
	const loadTutorials = async (tagName = "") => {
		let url = tagName ? `/tutorials?tag=${tagName}` : "/tutorials";

		try {
			const response = await api.get(url);
			setTutorials(response.data);
		} catch (error) {
			console.error("Error cargando tutoriales:", error);
		}
	};

	// elimina tutorial
	const deleteTutorial = async (id) => {
		await api.delete(`/tutorials/${id}`);
		loadTutorials(selectedTag);
	};

	// trae etiquetas para el filtro
	const loadTags = async () => {
		const response = await api.get("/tags");
		setTags(response.data);
	};

	return (
		<div className="container">
			
			<div className="header">
				<h1>Tutoriales</h1>

				<div className="links">
					<Link to="/create-tutorial">Crear</Link>
					<Link to="/tags">Etiquetas</Link>
				</div>
			</div>

			<div className="filter">
				<label>Filtrar por etiqueta: </label>

				<select
					value={selectedTag}
					onChange={(e) => setSelectedTag(e.target.value)}
				>
					<option value="">Todas</option>

					{tags.map((tag) => (
						<option key={tag.id} value={tag.name}>
							{tag.name}
						</option>
					))}
				</select>

				<button onClick={() => loadTutorials(selectedTag)}>
					Filtrar
				</button>
			</div>

			{tutorials.map((tutorial) => (
				<div className="card" key={tutorial.id}>
					<h3>{tutorial.title}</h3>
					<p>{tutorial.description}</p>

					<div className="tags">
						{tutorial.tags?.map((item) => (
							<span key={item.tag.id}>
								{item.tag.name}
							</span>
						))}
					</div>

					<button onClick={() => deleteTutorial(tutorial.id)}>
						Borrar
					</button>
				</div>
			))}
		</div>
	);
}

export default TutorialsPage;