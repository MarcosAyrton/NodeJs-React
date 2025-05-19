import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../context/UsersContext";
import UsersView from "./UsersView";
import UserForm from "./UserForm";

const UserModule = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<UsersView />} />
        <Route path="/crear" element={<UserForm />} />
        <Route path="/editar/:id" element={<UserForm />} />
      </Routes>
    </UserProvider>
  );
};

export default UserModule;
