import React from "react";
import { firebase } from "./firebase";

function App() {

  const [tareas, setTareas] = React.useState([]);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        //Base de datos
        const db = firebase.firestore();
        //Acceder a coleccion tareas
        const data = await db.collection('tareas').get();
        //console.log(data.docs);
        //Mapear data
        const arrData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        //console.log(arrData);
        setTareas(arrData)
      } catch (error) {
        console.log('Error: ' + error);
      }
    }
    obtenerDatos();
  }, [])



  return <div className="container mt-5">
    <h1 className="text-center text-primary">CRUD-FIRESTONE</h1>
    <hr />
    <div className="row">
      <div className="col-md-6">
        <h4 className="text-center">Listar Tareas</h4>
        <hr />
        <ol className="list-group list-group-flush list-group-numbered">
          {
            tareas.map(item => (
              <li key={item.id} className="list-group-item list-group-item-info list-group-item-action ">
                <strong>Nombre de la tarea:</strong> {item.name} <br />
                <strong>Cantidad de eventos:</strong> {item.cantidad}
              </li>
            ))
          }
        </ol>
      </div>
      <div className="col-md-6">
        <h4 className="text-center">Formulario</h4>
        <hr />
        <form >
          <div className="input-group mb-2">
            <div className="mb-2">
              <input
                className="mt-2 form-control"
                type="text"
                placeholder="Nombre de la tarea"
              />
            </div>
            <div className="mb-2">
              <input
                className="mt-2 form-control"
                type="text"
                placeholder="Cantidad de Eventos"
              />
            </div>
          </div>
          <button className="btn btn-primary">Agregar Tarea</button>
        </form>
      </div>
    </div>
  </div>;
}

export default App;
