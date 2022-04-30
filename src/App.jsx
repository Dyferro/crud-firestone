import React from "react";
import { firebase } from "./firebase";

function App() {

  const [tareas, setTareas] = React.useState([]);
  const [id, setId] = React.useState('');
  const [tarea, setTarea] = React.useState('');
  const [cantidad, setCantidad] = React.useState('');
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const obtenerDatos = async () => {
      //Obtener Datos con Try-Catch Funcionando ok
      try {
        //Base de datos
        const db = firebase.firestore();
        //Acceder a coleccion tareas
        const data = await db.collection('tareas').get();
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

      //Obtener Datos con Promesa Funciona con warnings
      /* const db = firebase.firestore();
       //Acceder a coleccion tareas
       const data = await db.collection('tareas').get()
         .then(() => {
           //Mapear data
           const arrData = data.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           }))
           setTareas(arrData)
         }).catch(error => (console.log(error)))*/

    }
    obtenerDatos();
  }, [])

  const addTarea = async (e) => {
    e.preventDefault()

    //Validaciones
    if (!tarea.trim()) {
      console.log('Tarea vacia');
      setError(error);
      return
    }

    if (!cantidad.trim()) {
      console.log('Cantidad vacia');
      setError(error);
      return
    }

    //Agregar tarea con Try-Catch funciona ok
    try {
      console.log(tarea + ': ' + cantidad);
      const db = firebase.firestore();
      const nuevaTarea = { name: tarea, cantidad: cantidad }
      const data = await db.collection('tareas').add(nuevaTarea);
      setTareas([
        ...tareas,
        { ...nuevaTarea, id: data.id }
      ])
      setTarea('')
      setCantidad('')
    } catch (error) {
      console.log(error);
      setError(error);
    }

    //Agregar con Promesa da problemas el data.id dentro de laa promesa...revisar luego
    /* const db = firebase.firestore();
     const nuevaTarea = { name: tarea, cantidad: cantidad };
     const data = await db.collection('tareas').add(nuevaTarea).then(() => {
       setTareas([
         ...tareas,
         { ...nuevaTarea, id: data.id }
       ])
       setTarea('')
       setCantidad('')
     }).catch(error => (console.log(error)));*/
  }

  const eliminarTarea = async (id) => {
    //Eliminar tarea con Try-Catch funcionando OK
    /* try {
       const db = firebase.firestore();
       await db.collection('tareas').doc(id).delete() //Eliminar de la BD
       const arrFilter = tareas.filter(item => item.id !== id);//Actualiza mi lista de tareas
       setTareas(arrFilter);
     } catch (error) {
       console.log(error);
     }*/

    //Eliminar en modo Promesa funciona OK
    const db = firebase.firestore();
    await db.collection('tareas').doc(id).delete().then(() => {
      const arrFilter = tareas.filter(item => item.id !== id);//Actualiza mi lista de tareas
      setTareas(arrFilter);
    }).catch(err => (console.log(err)))

  }

  const editarModo = (item) => {
    setModoEdicion(true);
    setTarea(item.name)
    setId(item.id)
    setCantidad(item.cantidad)
  }

  const editarTarea = async (e) => {
    e.preventDefault()

    //Validaciones
    if (!tarea.trim()) {
      console.log('Tarea vacia');
      setError(error);
      return
    }

    if (!cantidad.trim()) {
      console.log('Cantidad vacia');
      setError(error);
      return
    }

    //Editar tarea con Try-catch funciona ok
    /*try {
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).update({ name: tarea, cantidad: cantidad })
      const arrayEditado = tareas.map(item => item.id === id ? { id, name: tarea, cantidad: cantidad } : item)
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setCantidad('')
      setId('')
      setError(null)
    } catch (error) {
      console.log(error);
    }*/

    //Editar en Promesa funcionando Ok
    const db = firebase.firestore();
    await db.collection('tareas').doc(id).update({ name: tarea, cantidad: cantidad }).then(() => {
      const arrayEditado = tareas.map(item => item.id === id ? { id, name: tarea, cantidad: cantidad } : item)
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setCantidad('')
      setId('')
      setError(null)
    }).catch(err => (console.log(error)))


  }

  return <div className="container mt-2">
    <div className="container bg-dark p-3 rounded">
      <h1 className="text-center text-primary">CRUD-FIRESTONE</h1>
    </div>
    <hr />
    <div className="row ">
      <div className="col-md-6">
        <div className="container bg-secondary bg-gradient bg-opacity-75 p-2">
          <h4 className="text-center">Listar Tareas</h4>
        </div>
        <hr />
        <ol className="list-group list-group-flush list-group-numbered">
          {
            tareas.map(item => (
              <li key={item.id} className="list-group-item list-group-item-info list-group-item-action ">
                <strong>Nombre de la tarea:</strong> {item.name} <br />
                <strong>Cantidad de eventos:</strong> {item.cantidad} <br />

                <button
                  className="btn btn-danger btn-sm float-end"
                  onClick={() => eliminarTarea(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => editarModo(item)}
                >
                  Editar
                </button>

              </li>
            ))
          }
        </ol>
      </div>
      <div className="col-md-6">
        <div className="container bg-secondary bg-gradient bg-opacity-75 p-2">
          <h4 className="text-center">Formulario</h4>
        </div>
        <hr />
        <div className="container border border-dark p-6">
          <h5 className="text-center text-primary mt-3">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h5>
          <form onSubmit={modoEdicion ? editarTarea : addTarea} >
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <div className="input-group mb-2 p-3 ">
              <div className="mb-2">
                <input
                  className="mt-2 mb-2 form-control"
                  type="text"
                  placeholder="Nombre de la tarea"
                  onChange={e => setTarea(e.target.value)}
                  value={tarea}
                />
              </div>
              <div className="mb-2">
                <input
                  className="mt-2 form-control"
                  type="text"
                  placeholder="Cantidad de Eventos"
                  onChange={e => setCantidad(e.target.value)}
                  value={cantidad}
                />
              </div>
            </div>
            <button
              className={
                modoEdicion ? "btn btn-warning btn-block mb-3" : "btn btn-primary btn-block mb-3"
              }
              type="submit"
            >
              {
                modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
              }
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>;
}

export default App;
