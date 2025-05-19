import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-2xl flex justify-between items-center">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold">CRUD Geller</h1>
      </div>

      {/* Center Section */}
      <div className="flex gap-4">
        <Link to="/" className="flex items-center gap-2 hover:text-green-200">
          <i className="pi pi-home text-xl"></i> Inicio
        </Link>
        <Link to="/usuarios" className="flex items-center gap-2 hover:text-green-200">
          <i className="pi pi-users text-xl"></i> Usuarios
        </Link>
        <Link to="/productos" className="flex items-center gap-2 hover:text-green-200">
          <i className="pi pi-box text-xl"></i> Productos
        </Link>
      </div>

      {/* Right Section */}
      <div>
        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-green-200">
          <i className="pi pi-sign-out text-xl"></i> Dejar de trabajar
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
