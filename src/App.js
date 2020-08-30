import React from "react";

import "./styles.css";
import { useState, useEffect } from "react";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'Novo projeto ' + Date.now()
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete('repositories/' + id);

    if (response.status === 204) {
      const trepos = [...repositories];
      trepos.splice(trepos.findIndex(r => r.id === id), 1);

      setRepositories(trepos);

    } else {
      console.log('error');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (

            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
            </button>
            </li>
          )
        })}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
