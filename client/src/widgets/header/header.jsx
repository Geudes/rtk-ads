import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import AuthApi from '../../features/auth/api/auth-api'
import { logout } from '../../features/auth/models/auth-slice'

const Header = memo(function Header() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const logOutHandler = async () => {

    const res = await AuthApi.logout()
    if (res) {
      dispatch(logout())
    }

  }
  return (
    <nav className='header'>
      <h2><Link to={'/ads'}>Обьявления</Link></h2>
      {!user && (
        <div>
          <h2><Link to={'/register'}>Регистрация</Link></h2>
          <h2><Link to={'/login'}>Вход</Link></h2>
        </div>
      )}
      {user && (
        <>
          <button className='header_logout' onClick={logOutHandler}>Выход</button>
          <h2><Link to={'/profile'}>{user.name ?? user.email}</Link></h2>
          <h2><Link to={'/favorites'}>Избаранное</Link></h2>
          <h2><Link to={'/orders'}>Заказы</Link></h2>
        </>
      )}

      {user && user.role === 'admin' && (
        <>
          <h2><Link to={'/categories'}>Категории</Link></h2>
        </>
      )}
    </nav>
  )
}

)

export default Header