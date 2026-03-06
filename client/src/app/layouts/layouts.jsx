import { Outlet } from "react-router"
import Header from "../../widgets/header/header"

import './layout.css'


function Layouts() {
  return (
    <div className="layout">
      <Header />
        <main className="main">
          <Outlet />
        </main>
    </div>
  )
}

export default Layouts