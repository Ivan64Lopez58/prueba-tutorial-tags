import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TutorialsPage() {
	const [tutorials, setTutorials] =
		useState([]);

	useEffect(() => {
		loadTutorials();
	}, []);
				
	const loadTutorials = async () => {
		try {
			const response = await api.get("/tutorials");
			setTutorials(response.data);
		} catch (error) {
			console.error("Error cargando tutoriales:", error);
		}
	};

	return (
		<div>
			<Link to="/create-tutorial">Crear Tutorial</Link>
			<Link to="/tags">Administrar etiquetas</Link>

			<h1>Tutoriales</h1>
			
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
				</div>
			))}
		</div>
	);
}

export default TutorialsPage;