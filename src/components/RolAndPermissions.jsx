import { useState } from "react";
import { RolModel } from "../model/RolModel";

const RoleAndPermissions = ({ roles, permissions }) => {
    const [showModalPermission, setShowModalPermission] = useState(false);
    const [showModalRol, setShowModalRol] = useState(false);
    const [showArrayRol, setShowArrayRol] = useState(false);
    const [vRol, setVRol] = useState(roles);
    const [vPermissions, setVPermission] = useState(permissions);
    const [newPermission, setNewPermission] = useState('');
    const [newRol, setNewRol] = useState('');
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
        if (isValidPermission(newPermission)) {
            setVPermission(vPermissions.push(newPermission));
            setShowModalPermission(false);
        } else {
            alert('El permiso introducido no es válido.');
        }
    };
    const handleOkButtonClickRol = () => {
        if (isValidRol(newRol)) {
            vRol.push(new RolModel(`${(vRol[vRol.length - 1].id + 1)}`, newRol, vPermissions.filter(element => element.includes(":READ"))));
            setVRol(vRol);
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
    const handleSave = () => {
        setShowArrayRol(true);
    }
    return (
        <div className="flex items-center justify-center h-full overflow-auto m-5">
            <div className="min-w-full">
                <table className="border-collapse rounded-md shadow-lg table-auto m-2">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className='py-3 px-3 sticky left-0 top-0 bg-gray-100'></th>
                            {
                                countRepeatWord(vPermissions).map((permission, index) => {
                                    return <th className="text-center border-collapse border px-2" colSpan={permission.repeats} key={index}>{capitalizeText(permission.word)}</th>
                                })
                            }
                        </tr>
                        <tr>
                            <th className="sticky left-0 top-0 bg-gray-100">Roles</th>
                            {
                                vPermissions.map((permission, index) => {
                                    return <th className="text-center border-collapse border px-2 bg-gray-100" colSpan={1} key={index}>{capitalizeText(permission.split(":")[1])}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vRol.map((rol, index) => {
                                return <tr className="p-3 text-center" key={index}>
                                    <td className="sticky left-0 top-0 bg-white">
                                        {rol.name}
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
            </div>
        </div >
    )
}

export default RoleAndPermissions;