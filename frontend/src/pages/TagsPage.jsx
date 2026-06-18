import { useEffect, useState } from "react";
import api from "../services/api";
import "./TagsPage.css";

function TagsPage() {
	const [tags, setTags] = useState([]);
	const [name, setName] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editingName, setEditingName] = useState("");

	useEffect(() => {
		loadTags();
	}, []);

	// trae las etiquetas
	const loadTags = async () => {
		const response =
			await api.get("/tags");

		setTags(response.data);
	};

	// crea nueva etiqueta
	const createTag = async () => {
		await api.post("/tags", {
			name,
		});

		setName("");
		loadTags();
	};

	// elimina etiqueta
	const deleteTag = async (id) => {
		await api.delete(`/tags/${id}`);
		loadTags();
	};

	// actualiza etiqueta
	const updateTag = async () => {
		await api.put(`/tags/${editingId}`, { name: editingName, });
		setEditingId(null);
		setEditingName("");
		loadTags();
	};

	return (
		<div className="container">
			<h1>Etiquetas</h1>
			<label htmlFor="tagName">Nombre de la etiqueta </label>
			<input
				className="input"
				id="tagName"
				name="tagName"
				value={name}
				onChange={(e) => setName(e.target.value)}/>

			<button className="button" onClick={createTag}> Añadir etiqueta</button>
			
			<ul className="list">
				{tags.map((tag) => (
					<li className="item" key={tag.id}>
						{editingId === tag.id ? ( <>
						<input className="input" id={`edit-tag-${tag.id}`} name="editingTagName" value={editingName}
							onChange={(e) => setEditingName(e.target.value)}/>

						<button className="saveBtn" onClick={updateTag}>Guardar</button>
						<button className="cancelBtn" onClick={() => setEditingId(null)}>Cancelar</button></> 

						) : ( <>
						{tag.name}
						<button className="editBtn" onClick={() => { setEditingId(tag.id); setEditingName(tag.name); }}>Editar</button>
						<button className="deleteBtn" onClick={() => deleteTag(tag.id)}>Eliminar</button></>)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TagsPage;