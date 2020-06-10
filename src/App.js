import React from "react";
import { useState } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useState(() => {
    api.get("/repositories").then(response => setRepositories(response.data));
  }, []);


  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Teste: ${Date.now()}`,
      url: "https://github.com/Haple/bate-ponto-backend",
      techs: ["NodeJS", "Docker", "PostgreSQL"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories([...repositories.filter(repository => repository.id !== id)])
  }

  return (
    <>
      <h2>Repositories</h2>

      <ul data-testid="repository-list">
        {
          repositories.map(({ title, id }) =>
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
