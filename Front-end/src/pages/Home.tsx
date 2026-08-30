import { Link } from "react-router"

function Home() {
  return (
    <div className="space-x-2 text-white">
        <Link to="/login">Login</Link>
        <Link to="/register">Registar</Link>
        <Link to="/Pedidos">Pedidos</Link>
    </div>
    
  )
}

export default Home