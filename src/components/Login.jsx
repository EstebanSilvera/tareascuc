import { useEffect, useState } from "react";

const Login = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const sesion = async (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:4000/session", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode == 200) {
                    localStorage.setItem("TOKEN", data.token)
                    localStorage.setItem("NOMBRE", data.information[0][3])
                    localStorage.setItem("APELLIDO", data.information[0][4])
                    localStorage.setItem("ID", data.information[0][0])
                    window.location.href = "/dashboard"
                } else {
                    console.log(data.statusCode)
                }
            });

    }

    const [passwordconfirm, setPasswordconfirm] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");

    const register = async (e) => {
        e.preventDefault();

        if (username != "" && password != "" && name != "" && lastname != "") {

            if (password === passwordconfirm) {

                fetch("http://127.0.0.1:4000/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, name, lastname })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.statusCode == 201) {
                            alert(data.mensaje)
                        } else {
                            alert(data.mensaje)
                            console.log(data.statusCode)
                        }
                    });
            } else {
                console.log("contrasenas diferentes")
            }
        } else {
            console.log("llene los campos")
        }

    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="w-96 min-h-80 p-6 py-10 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="flex justify-center text-2xl font-semibold text-gray-700 dark:text-white">Inicio de sesion</h2>

                <form onSubmit={sesion}>
                    <div className="grid gap-y-4 mt-4">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Iniciar sesion
                        </button>

                    </div>
                </form>
                <div className="flex justify-center">
                    <button onClick={() => setIsOpen(true)} className="px-8 py-2.5 leading-5 text-black dark:text-white transition-colors duration-300 transform rounded-md focus:outline-none text-sm">
                        Si no tienes cuenta, registrate aqui...
                    </button>
                </div>
            </section>


            <div className="relative flex justify-center">

                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-lg"
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
                                    Registro de usuarios
                                </h3>

                                <hr className="mt-6" />

                                <form onSubmit={register} className="mt-4" action="#">

                                    <div className="flex">
                                        <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                            Nombre

                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                            />
                                        </label>

                                        <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                            Apellido

                                            <input
                                                onChange={(e) => setLastname(e.target.value)}
                                                type="text"
                                                className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                            />
                                        </label>
                                    </div>

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Nombre de usuario
                                    </label>

                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                    />

                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Contraseña
                                    </label>

                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-4 mt-2"
                                    />
                                    <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200 p-4 ">
                                        Confirmacion de contraseña
                                    </label>

                                    <input
                                        onChange={(e) => setPasswordconfirm(e.target.value)}

                                        type="password"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 mb-6 mt-2"
                                    />


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
        </div>
    )
}

export default Login