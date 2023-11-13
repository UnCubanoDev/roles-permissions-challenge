import RoleAndPermisions from "./components/RolAndPermissions"
import { RolModel } from './model/RolModel';

function App() {
  const rol1 = new RolModel("1", "Admin", ["PROJECT:WRITE", "PROJECT:READ", "PROJECT:DELETE"]);
  const rol2 = new RolModel("2", "User", ["PROJECT:READ", "STORAGE:READ"]);
  const rol3 = new RolModel("3", "Guest", ["PROJECT:READ", "USER:READ"]);
  const rol4 = new RolModel("4", "SuperAdmin", ["PROJECT:WRITE", "PROJECT:READ", "PROJECT:DELETE", "USER:WRITE", "USER:READ", "USER:DELETE", "STORAGE:WRITE", "STORAGE:READ", "STORAGE:DELETE"]);

  const roles = [
    rol1,
    rol2,
    rol3,
    rol4
  ]
  const permissions = ["PROJECT:WRITE", "PROJECT:READ", "PROJECT:DELETE", "USER:WRITE", "USER:READ", "USER:DELETE", "STORAGE:WRITE", "STORAGE:READ", "STORAGE:DELETE", , "ADMIN:WRITE", "ADMIN:READ", "ADMIN:DELETE", "CODE:WRITE", "CODE:READ", "CODE:DELETE"]

  return (
    <>
      <RoleAndPermisions roles={roles} permissions={permissions} />
    </>
  )
}

export default App
