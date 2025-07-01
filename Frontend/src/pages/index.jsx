import "./style.css";
import Lixeira from "../../assets/lixeira.svg";
import api from "../../services/api"; 
import {useEffect, useState} from "react";

function Home() {
  const [users,setUsers] = useState([])

  async function getUsers(){
    const usersFormsapi = await api.get('/usuarios')

    setUsers(usersFormsapi.data)
    console.log (users)
  }
  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`)
    
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <h1>Usuários</h1>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button type="button" onClick={() => deleteUser(user.id)}>
            <img src={Lixeira} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
