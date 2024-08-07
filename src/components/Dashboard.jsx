import { useState, useEffect } from "react"

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const informacion = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InBydWViYTIwMjJAY3VjLmVkdS5jbyIsImV4cCI6MTY0OTQ1MzA1NCwiY29ycmVvIjoicHJ1ZWJhMjAyMkBjdWMuZWR1LmNvIn0.MAoFJE2SBgHvp9BS9fyBmb2gZzD0BHGPiyKoAo_uYAQ'
        },
        mode: "cors"
    };

    const [recursos, setRecursos] = useState([]);
    const [selectrecursos, setSelectrecursos] = useState(0);
    const [resource, setResource] = useState([]);
    const [originalRecursos, setOriginalRecursos] = useState([]);
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        const fetchRecursos = async () => {
            try {
                fetch('http://consultas.cuc.edu.co/api/v1.0/recursos', informacion)
                    .then(response => response.json())
                    .then(data => { setRecursos(data) });

            } catch (error) {
                console.error("Error fetching recursos:", error);
            }
        };

        fetchRecursos();
    }, []);

    const [tareas, setTareas] = useState([])
    const [tareasOriginal, setTareasOriginal] = useState([])

    useEffect(() => {
        const buscarTarea = () => {
            const tablafiltro = tareasOriginal.filter(item => item.title.toLowerCase().includes(buscar.toLowerCase()));
            setTareas(tablafiltro);
        };

        buscarTarea();
    }, [buscar, tareasOriginal]);

    const closeSesion = () => {
        localStorage.clear("TOKEN")
        window.location.href = "/"
    }

    console.log(tareas)
    // console.log(buscar)

    useEffect(() => {
        const user_id = localStorage.getItem("ID")
        // console.log(user_id)
        const tareas = async () => {
            try {
                fetch('http://127.0.0.1:4000/show_task', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id })
                })
                    .then(response => response.json())
                    .then(data => { setTareas(data.tasks); setTareasOriginal(data.tasks); setOriginalRecursos(data.tasks_resource) });

            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        tareas();
    }, []);

    const guardar = () => {

        const selectedNumber = Number(selectrecursos);

        if (selectrecursos !== "" && !resource.includes(selectedNumber)) {
            setResource([...resource, selectedNumber]);
        }
    }

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const crearTarea = (e) => {

        e.preventDefault();

        console.log(resource)

        const user_id = localStorage.getItem("ID")

        if (title != "" && description != "" && resource.length != 0) {
            fetch('http://127.0.0.1:4000/create_task', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, title, description, resource })
            })
                .then(response => response.json())
                .then(data => alert(data.mensaje));
            window.location.replace("")

        } else {
            console.log("llene los campos")
        }
    }

    const tareacompleta = (id) => {

        fetch('http://127.0.0.1:4000/complete_task', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode == 200) {
                    window.location.replace('');
                }
            });
    }

    const tareadelete = (id) => {

        fetch('http://127.0.0.1:4000/delete_task', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode == 200) {
                    window.location.replace('');
                }
            });
    }

    const [nombreTareaId, setNombreTareaId] = useState()

    const editartarea = (e) => {
        e.preventDefault()

        const id = nombreTareaId

        fetch('http://127.0.0.1:4000/update_task', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, id })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.statusCode == 200) {
                    // window.location.replace('');
                }
            });
    }

    // console.log(tareas[nombreTareaId]?.title)

    console.log(originalRecursos)

    return (
        <div className="flex items-center">

            

            <aside className="flex flex-col w-64 min-h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-white">Dashboard</h2>

                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor"></path>
                        </svg>
                    </span>

                    <input onChange={(e) => setBuscar(e.target.value)} type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <button onClick={() => setIsOpen(true)} className="flex items-center w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                            Creacion de tarea
                        </button>
                    </nav>


                    <div>
                        <a href="#" className="flex items-center -mx-2 mb-2">
                            <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{localStorage.getItem("NOMBRE") + " " + localStorage.getItem("APELLIDO")}</span>
                        </a>

                        <button onClick={() => closeSesion()} className="flex justify-center items-center w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                            Cerrar sesion
                        </button>
                    </div>
                </div>
            </aside>

            {/* tablas  */}

            

            <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold mx-auto mb-4">Listas de tareas</h1>
                <div className="overflow-x-auto">
                    <div className="min-w-full py-2 align-middle inline-block sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Titulo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descripcion
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Recursos
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estados
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tareas.map((itemTasks, index) => (
                                        <tr key={index}>
                                            {itemTasks.status == 1 ? (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {itemTasks.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {itemTasks.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {
                                                            originalRecursos
                                                                .filter(resource => resource.task_id === itemTasks.id)
                                                                .map((filteredResource, index) => {
                                                                    const resourceName = recursos.find(resource => resource.id === filteredResource.resource_id)?.nombre;
                                                                    return (
                                                                        <div key={index}>
                                                                            {resourceName}
                                                                        </div>
                                                                    );
                                                                })
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex gap-6">
                                                            <button onClick={() => { setIsOpen2(true); setNombreTareaId(itemTasks.id); }} className="bg-yellow-300 p-2 rounded-xl">
                                                                editar
                                                            </button>
                                                            <button onClick={() => tareadelete(itemTasks.id)} className="bg-red-300 p-2 rounded-xl">
                                                                eliminar
                                                            </button>
                                                            <button onClick={() => tareacompleta(itemTasks.id)} className="bg-green-300 p-2 rounded-xl">
                                                                Completada
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : itemTasks.status === 2 ? (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-green-300">
                                                        {itemTasks.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-green-300">
                                                        {itemTasks.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-green-300">
                                                        {
                                                            originalRecursos
                                                                .filter(resource => resource.task_id === itemTasks.id)
                                                                .map((filteredResource, index) => {
                                                                    const resourceName = recursos.find(resource => resource.id === filteredResource.resource_id)?.nombre;
                                                                    return (
                                                                        <div key={index}>
                                                                            {resourceName}
                                                                        </div>
                                                                    );
                                                                })
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-green-300">
                                                        <div className="flex gap-6">
                                                            <button hidden className="bg-yellow-300 p-2 rounded-xl">
                                                                editar
                                                            </button>
                                                            <button hidden className="bg-red-300 p-2 rounded-xl">
                                                                eliminar
                                                            </button>
                                                            <button hidden className="bg-green-300 p-2 rounded-xl">
                                                                Completada
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            {/* modal de crear tareas */}

            <div className="relative flex justify-center">

                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 backdrop-blur-lg"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="block items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">

                            <div
                                className="relative inline-block py-20 px-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                            >
                                <h3
                                    className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                                    id="modal-title"
                                >
                                    Agregar tareas a los recursos
                                </h3>

                                <hr className="mt-6" />

                                <form onSubmit={crearTarea} className="mt-4" action="#">

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Titulo de la tarea
                                    </label>

                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        id="tarea"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-2 mt-2"
                                    />

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Descripcion
                                    </label>

                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="comment"
                                        id="tarea"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                    />


                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Confirmacion de contraseña
                                    </label>

                                    <div className="flex justify-center items-center">
                                        <select name="select"
                                            onChange={(e) => setSelectrecursos(e.target.value)}
                                            value={selectrecursos}
                                            className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-2 mt-2"
                                        >

                                            {
                                                recursos.map((data) => (
                                                    <option key={data.id} value={data.id}>{data.nombre}</option>
                                                ))
                                            }

                                        </select>
                                        <button
                                            onClick={() => guardar()}
                                            type="button"
                                            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        >
                                            Agregar recurso
                                        </button>
                                    </div>

                                    <ul className="px-5 flex flex-wrap gap-4 w-full">
                                        {resource.map((artist, index) => (
                                            <li className="text-black dark:text-white" key={index}>{recursos[artist - 1].nombre}</li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        >
                                            Send invites
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>




            {/* Editar tarea  */}

            <div className="relative flex justify-center">

                {isOpen2 && (
                    <div
                        className="fixed inset-0 z-10 backdrop-blur-lg"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="block items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">

                            <div
                                className="relative inline-block py-20 px-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                            >
                                <h3
                                    className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                                    id="modal-title"
                                >
                                    Editar tarea - {tareas[nombreTareaId - 1]?.title}
                                </h3>

                                <hr className="mt-6" />

                                <form onSubmit={editartarea} className="mt-4" action="#">

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Titulo de la tarea
                                    </label>

                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        id="tarea"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-2 mt-2"
                                    />

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Descripcion
                                    </label>

                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="comment"
                                        id="tarea"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                    />


                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Confirmacion de contraseña
                                    </label>

                                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen2(false)}
                                            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        >
                                            Send invites
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Dashboard