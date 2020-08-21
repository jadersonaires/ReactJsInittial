import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data);
		})
	}, [repositories])

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			title: "React Web",
			url: "https://github.com/jadersonaires",
			techs: ["React", "Web"],
			likes: 0
		})

		const repository = response.data;
		setRepositories([...repositories, repository])

	}

	async function handleRemoveRepository(item) {
		api.delete(`repositories/${item.id}`).then(response => {
			console.log(response);
		})
	}

	return (
		<div>
			<ul data-testid="repository-list">

				{repositories.map((item) => (
					<li key={item.id} >
						{ item.title }
						<button onClick={() => handleRemoveRepository(item)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
