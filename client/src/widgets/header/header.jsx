import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import AuthApi from '../../features/auth/api/auth-api'
import { logout } from '../../features/auth/models/auth-slice'
import styles from './header.module.css'

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
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link to={'/ads'}>Обьявления</Link>
        {!user && (
          <>
            <Link to={'/register'}>Регистрация</Link>
            <Link to={'/login'}>Вход</Link>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Link to={'/categories'}>Категории</Link>
          </>
        )}
        {user && (
          <>
            <Link to={'/favorites'}>Избаранное</Link>
            <Link to={'/orders'}>Заказы</Link>
            <Link to={'/profile'}>{user.name ?? user.email}</Link>
            <button className='header_logout' onClick={logOutHandler}>🔙</button>
          </>
        )}

      </nav>

    </header>
  )
}

)

export default Header