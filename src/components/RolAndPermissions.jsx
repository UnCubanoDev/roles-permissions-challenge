import { useState } from "react";
import { RolModel } from "../model/RolModel";
import { FaRegSquare, FaTrash } from 'react-icons/fa';

const RoleAndPermissions = ({ roles, permissions }) => {

    const env = import.meta.env;
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [showModalPermission, setShowModalPermission] = useState(false);
    const [responseData, setResponseData] = useState(false);
    const [showModalRol, setShowModalRol] = useState(false);
    const [showArrayRol, setShowArrayRol] = useState(false);
    const [vRol, setVRol] = useState(roles);
    const [vPermissions, setVPermission] = useState(permissions);
    const [newPermission, setNewPermission] = useState('');
    const [newRol, setNewRol] = useState('');
    const handleMouseOverRol = (id) => {
        setSelectedRol(id);
    }
    const handleMouseOverEntity = (id) => {
        setSelectedEntity(id);
    }
    const handleMouseOverPermission = (id) => {
        setSelectedPermission(id);
    }
    const handleMouseOutRol = () => {
        setSelectedRol(null);
    }
    const handleMouseOutEntity = () => {
        setSelectedEntity(null);
    }
    const handleMouseOutPermission = () => {
        setSelectedPermission(null);
    }
    const handleAddRol = () => {
        setShowModalRol(true);
    }
    const capitalizeText = (text) => {
        let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        capitalizedText = capitalizedText.replace(/_/g, ' ');
        return capitalizedText;
    }
    const countRepeatWord = (array) => {
        let count = {};
        array.forEach(word => {
            if (count[word.split(":")[0]]) {
                count[word.split(":")[0]]++;
            } else {
                count[word.split(":")[0]] = 1;
            }
        });

        let result = [];
        for (let word in count) {
            result.push({ word: word.split(":")[0], repeats: count[word.split(":")[0]] });
        }
        return result;
    }
    const handleAddNewPermission = () => {
        setShowModalPermission(true);
    };

    const handleOkButtonClickPermission = () => {
        if (isValidPermission(newPermission.toUpperCase())) {
            vPermissions.push(newPermission.toUpperCase());
            setVPermission(vPermissions);
            setNewPermission('');
            setShowModalPermission(false);
        } else {
            alert('El permiso introducido no es válido.');
        }
    };
    const handleOkButtonClickRol = async () => {
        if (isValidRol(newRol)) {
            vRol.push(new RolModel(`${parseInt(vRol[vRol.length - 1].id) + 1}`, newRol, vPermissions.filter(element => element.includes(":READ"))));
            setVRol(vRol);
            try {
                const response = await fetch(`${env.VITE_REACT_APP_API_URL}/roles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vRol)
                });

                if (!response.ok) {
                    throw new Error('La respuesta de la red no es correcta');
                }

                const jsonResponse = await response.json();
                setResponseData(true);
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
            setNewRol('');
            setShowModalRol(false);
        } else {
            alert('El rol introducido no es válido o ya se encuentra registrado.');
        }

    };
    const handleCancelButtonClickRol = () => {
        setShowModalRol(false);
    }
    const handleCancelButtonClickPermission = () => {
        setShowModalPermission(false);
    }
    const isValidPermission = (permission) => {
        const permissionRegex = /^[A-Z_]+:[A-Z_]+$/;
        return permissionRegex.test(permission);
    };
    const isValidRol = (rolName) => {
        return rolName.trim() !== "" && !vRol.find(element => element.name === rolName)
    }
    const handleUpdateRol = async (element) => {
        try {
            const response = await fetch(`${env.VITE_REACT_APP_API_URL}/roles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vRol)
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no es correcta');
            }

            const jsonResponse = await response.json();
            setResponseData(true);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
        if (vRol.every(item => item.permissions.includes(element))) {
            const newRoles = vRol.map(item => ({ ...item, permissions: item.permissions.filter(permission => permission !== element) }));
            return setVRol(newRoles);
        } {
            const newRoles = vRol.map(item => ({ ...item, permissions: [...item.permissions, element] }));
            return setVRol(newRoles);
        }
    }
    const handleDeleteRol = async (id) => {
        let newArray = vRol.filter(objeto => objeto.id !== id);
        setVRol(newArray);
        try {
            const response = await fetch(`${env.VITE_REACT_APP_API_URL}/roles`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no es correcta');
            }

            const jsonResponse = await response.json();
            setResponseData(true);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    }
    const handlePermissions = (id) => {
        const newRoles = vRol.map((rol) => {
            if (rol.id == id) {
                if (rol.permissions.length != vPermissions.filter(permission => permission.trim() !== '').length) {
                    rol.permissions = rol.permissions.concat(vPermissions.filter(element => !rol.permissions.includes(element)));
                    const uniquePermissions = Array.from(new Set(rol.permissions));
                    rol.permissions = uniquePermissions.filter(permission => permission.trim() !== '');
                } else {
                    rol.permissions = [];
                }
                return rol;
            } else {
                return rol;
            }
        });
        setVRol(newRoles);
    }
    const handleDeletePermission = async (element) => {
        console.log(element);
        const newRoles = vRol.map(item => ({ ...item, permissions: item.permissions.filter(permission => permission !== element) }));
        console.log(newRoles);
        return setVRol(newRoles) && setVPermission(vPermissions.filter(permission => permission !== element));
    }
    const handleUpdateEntity = async (element) => {
        const filteredElements = vRol.filter(item => item.permissions.some(permission => permission.includes(element)));

        if (filteredElements.length > 0) {
            const newRoles = vRol.map(item => {
                console.log(item);
                console.log(filteredElements.includes(item))
                if (filteredElements.includes(item)) {
                    const uniquePermissions = Array.from(new Set(item.permissions.filter(permission => !permission.includes(element))));
                    return { ...item, permissions: uniquePermissions };
                } else {
                    return item;
                }
            });
            return setVRol(newRoles);
        } else {
            const newRoles = vRol.map(item => ({ ...item, permissions: [...item.permissions, ...vPermissions.filter(permission => permission.includes(element))] }));
            return setVRol(newRoles);
        }
    }
    const handleDeleteEntity = async (element) => {
        const filteredElements = vRol.filter(item => item.permissions.some(permission => permission.includes(element)));

        if (filteredElements.length > 0) {
            const newRoles = vRol.map(item => {
                if (filteredElements.includes(item)) {
                    return { ...item, permissions: item.permissions.filter(permission => !permission.includes(element)) };
                } else {
                    return item;
                }
            });
            const newPermission = vPermissions.filter(permission => !permission.includes(element));
            console.log(newPermission);
            setVRol(newRoles) 
            setVPermission(newPermission);
        } else {
            const newRoles = vRol.map(item => ({ ...item, permissions: item.permissions.filter(permission => !permission.includes(element)) }));
            const newPermission = vPermissions.filter(permission => !permission.includes(element));
            console.log(newPermission);
            setVRol(newRoles) 
            setVPermission(newPermission);
        }
    }
    const handleSave = async () => {

        setShowArrayRol(true);
    }
    return (
        <div className="flex items-center justify-center h-full overflow-auto m-5">
            <div className="min-w-full">
                <table className="border-collapse rounded-md shadow-lg table-auto m-2">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className='py-3 px-3 sticky left-0 top-0 bg-gray-100'></th>
                            {
                                countRepeatWord(vPermissions).map((permission, index) => {
                                    return <th className="text-center border-collapse border px-2 justify-between flex-row" colSpan={permission.repeats}
                                        rowSpan={1}
                                        key={index}
                                        onMouseOver={() => handleMouseOverEntity(index)}
                                        onMouseOut={handleMouseOutEntity}>
                                        {selectedEntity === index && (
                                            <FaRegSquare
                                                onClick={() => handleUpdateEntity(`${permission.word}:`)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {capitalizeText(permission.word)}
                                        {selectedEntity === index && (
                                            <FaTrash
                                                onClick={() => handleDeleteEntity(`${permission.word}:`)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                    </th>
                                })
                            }
                        </tr>
                        <tr className="text-center">
                            <th className="sticky left-0 top-0 bg-gray-100">Roles</th>
                            {
                                vPermissions.map((permission, index) => {
                                    return <th className="text-center border-collapse border p-3 bg-gray-100 justify-between flex-row"
                                        key={index} onMouseOver={() => handleMouseOverPermission(index)}
                                        onMouseOut={handleMouseOutPermission}
                                        colSpan={1}>
                                        {selectedPermission === index && (
                                            <FaRegSquare
                                                onClick={() => handleUpdateRol(permission)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {capitalizeText(permission.split(":")[1])}
                                        {selectedPermission === index && (
                                            <FaTrash
                                                onClick={() => handleDeletePermission(permission)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                    </th>
                                })
                            }
                            <td className="text-center" rowSpan={vRol.length + 2}>
                                <button className="bg-gray-100 rounded-md p-3 m-2" onClick={handleAddNewPermission}>
                                    +
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vRol.map((rol, index) => {
                                return <tr className="p-3 text-center" key={index}>
                                    <td className="sticky left-0 top-0 bg-white items-center flex"
                                        key={rol.id}
                                        onMouseOver={() => handleMouseOverRol(rol.id)}
                                        onMouseOut={handleMouseOutRol}
                                        colSpan={3}
                                        rowSpan={1}>
                                        {selectedRol === rol.id && (
                                            <FaRegSquare
                                                onClick={() => handlePermissions(rol.id)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {rol.name}
                                        {selectedRol === rol.id && (
                                            <FaTrash
                                                onClick={() => handleDeleteRol(rol.id)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                    </td>
                                    {
                                        vPermissions.map((permission, index) => {
                                            return rol.permissions?.includes(permission) ? <td className='text-center m-3' key={index}>X</td> : <td className='text-center m-3' key={index} />
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr colSpan={vPermissions.length}>
                            <td className="text-center" colSpan={vPermissions.length}>
                                <button className="gap-0" onClick={handleAddRol}>
                                    + Add Role
                                </button>
                            </td>
                        </tr>
                        <tr colSpan={vPermissions.length}>
                            <td className="sticky left-0 top-0 flex items-end justify-end text-end" colSpan={vPermissions.length}>

                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSave}>Salvar</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {showModalPermission && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center space-y-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Agregar nuevo permiso:
                            </label>
                            <input className="p-2 border border-gray-300" value={newPermission} onChange={(e) => setNewPermission(e.target.value)} />
                            <div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleOkButtonClickPermission}>Ok</button>
                                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-4" onClick={handleCancelButtonClickPermission}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
                {showModalRol && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center space-y-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Agregar nuevo del rol:
                            </label>
                            <input className="p-2 border border-gray-300" value={newRol} onChange={(e) => setNewRol(e.target.value)} />
                            <div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleOkButtonClickRol}>Ok</button>
                                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-4" onClick={handleCancelButtonClickRol}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
                {showArrayRol && (
                    < div >
                        <h2 className="text-center font-bold">Listado de Roles</h2>
                        <div className="grid grid-cols-2 m-2">
                            {vRol.map((rol) => (
                                <div key={rol.id}>
                                    <h2 className="text-lg font-bold text-center">Id: {rol.id}</h2>
                                    <p className="text-sm">Nombre: {rol.name}</p>
                                    <p className="text-sm">Permisos: {`[ ${rol.permissions} ]`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {responseData && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center space-y-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                La solicitud ha sido satisfactoria...
                            </label>
                            <div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={setResponseData(false)}>Ok</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default RoleAndPermissions;