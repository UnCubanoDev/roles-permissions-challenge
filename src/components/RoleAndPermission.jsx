// import jsonData from '../data.json';
// const env = import.meta.env
// import { useState } from 'react';
// import { FaTrash } from 'react-icons/fa';


// function RoleAndPermission() {
    // const capitalizeText = (text) => {
    //     // Capitalizar la primera letra y convertir el resto en minúsculas
    //     let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    //     // Sustituir el carácter de subrayado por un espacio en blanco
    //     capitalizedText = capitalizedText.replace(/_/g, ' ');
    //     return capitalizedText;
    // }
//     const handleAddPermission = () => {
//         // Validar si el permiso introducido es válido
//         if (isValidPermission(newPermission)) {
//             // Verificar si la entidad ya existe en la tabla
//             const existingEntityIndex = tableData.findIndex((data) => data.entity === newPermission.split(':')[0]);
//             if (existingEntityIndex !== -1) {
//                 // Si la entidad existe, agregar el permiso a esa entidad
//                 const updatedTableData = [...tableData];
//                 updatedTableData[existingEntityIndex].permissions.push(newPermission);
//                 setTableData(updatedTableData);
//             } else {
//                 // Si la entidad no existe, agregar una nueva entidad con el nuevo permiso
//                 setTableData([...tableData, { entity: newPermission.split(':')[0], permissions: [newPermission] }]);
//             }
//             // Cerrar el modal y limpiar el input
//             setModalOpen(false);
//             setNewPermission('');
//         } else {
//             alert('El permiso introducido no es válido');
//         }
//     };

//     const isValidPermission = (permission) => {
//         // Lógica para validar si el permiso es válido
//         return permission.match(/^[A-Z]+:[A-Z]+$/);
//     };

    // function countRepeatWord(array) {
    //     let count = {};
    //     array.forEach(word => {
    //         if (count[word.split(":")[0]]) {
    //             count[word.split(":")[0]]++;
    //         } else {
    //             count[word.split(":")[0]] = 1;
    //         }
    //     });

    //     let result = [];
    //     for (let word in count) {
    //         result.push({ word: word.split(":")[0], repeats: count[word.split(":")[0]] });
    //     }
    //     return result;
    // }
//     function getJSONData(json) {
//         var rolPermissions = [];
//         json.data.map((rol) => {
//             rol.permissions.map((permission) => {
//                 rolPermissions.push(permission);
//             });
//         });
//         var result = rolPermissions.filter((value, index, self) => {
//             return (self.indexOf(value) === index);
//         });
//         return result.sort();
//     };
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <table className="mx-auto border-collapse rounded-lg shadow-lg table-auto w-full my-10">
//                 <thead>
//                     <tr className='bg-gray-100 sticky' key="thead">
//                         <th className='py-3 px-3'></th>
//                         {countRepeatWord(getJSONData(jsonData)).map((entity, index) => {
//                             return <th class="text-gray-700" key={index} colSpan={entity.repeats}
//                                 onMouseOver={() => handleEntityMouseOver(index)}
//                                 onMouseOut={handleEntityMouseOut}>
//                                 {selectedEntity === index && (
//                                     <input
//                                         type="checkbox"
//                                         onChange={(event) => handleCheckAllEntityPermissions(index, event)}
//                                     />)
//                                 }
//                                 {capitalizeText(entity.word)}
//                                 {selectedEntity === index && (
//                                     <FaTrash
//                                         onClick={() => handleDeleteRole(index)}
//                                         style={{ marginLeft: '10px', cursor: 'pointer' }}
//                                     />
//                                 )}
//                             </th>
//                         })}
//                     </tr>
//                     <tr className='bg-gray-100 sticky' key="thead1">
//                         <th className='text-gray-700 py-3 px-3'>Roles</th>
//                         {getJSONData(jsonData).map((value, index) => {
//                             // console.log(value)
//                             return <th class="text-gray-700 py-3 px-3" key={index}
//                                 onMouseOver={() => handlePermissionMouseOver(index)}
//                                 onMouseOut={handlePermissionMouseOut}>
//                                 {selectedPermission === index && (
//                                     <input
//                                         type="checkbox"
//                                         onChange={(event) => handleCheckPermissionForAllRoles(index, event)}
//                                     />
//                                 )}
//                                 {capitalizeText(value.split(":")[1])}
//                                 {selectedPermission === index && (
//                                     <FaTrash
//                                         onClick={() => handleDeleteRole(index)}
//                                         style={{ marginLeft: '10px', cursor: 'pointer' }}
//                                     />
//                                 )}
//                             </th>
//                         })}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className='bg-gray-100' key="body"></tr>
//                     {jsonData.data.map((val, index) => {
//                         return <tr className='bg-white py-2' key={index} >
//                             <td class="text-gray-700 py-3 px-3" key={index}
//                                 onMouseOver={() => handleMouseOver(index)}
//                                 onMouseOut={handleMouseOut}>
//                                 {selectedRole === index && (
//                                     <input className='mx-3'
//                                         type="checkbox"
//                                         onChange={(event) => handleCheckAllPermissions(index, event)}
//                                     />
//                                 )}
//                                 {val.name}
//                                 {selectedRole === index && (
//                                     <FaTrash
//                                         onClick={() => handleDeleteRole(index)}
//                                         style={{ marginLeft: '10px', cursor: 'pointer' }}
//                                     />
//                                 )}
//                             </td>

//                             {
//                                 getJSONData(jsonData).map((permission) => {
//                                     return val.permissions.includes(permission) ? <td className='text-center'>X</td> : <td className='text-center' />
//                                 })
//                             }
//                         </tr>
//                     })}
//                     <td>
//                         <button onClick={() => setShowNewPermissionModal(true)}>Agregar Permiso</button>
//                     </td>
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <td colSpan={getJSONData(jsonData).length + 1} className='text-center'>
//                             <button type="submit" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-md'>+ Agregar Rol</button>
//                         </td>
//                     </tr>
//                 </tfoot>
//                 {/* <td>
//                     <button onClick={() => setModalOpen(true)}>Agregar Permiso</button>
//                     {modalOpen && (
//                         <div>
//                             <input type="text" value={newPermission} onChange={(e) => setNewPermission(e.target.value)} />
//                             <button onClick={handleAddPermission}>Ok</button>
//                         </div>
//                     )}
//                 </td> */}
//             </table>
        
//             <button onClick={handleSave} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-md'>Salvar</button>
//         </div>
//     );
// }

// export default RoleAndPermission