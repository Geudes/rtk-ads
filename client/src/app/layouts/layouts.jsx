import { Outlet } from "react-router"
import Header from "../../widgets/header/header"


function Layouts() {
  return (
    <div className="layout">
      <Header />
      <div>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layouts