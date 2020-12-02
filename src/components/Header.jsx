import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getCurrentUser } from 'dux/userSlice'

const Header = () => {
  const user = useSelector(getCurrentUser)

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href='/'>
              <a>Inicio</a>
            </Link>
          </li>
          {user.isAuthenticated
            ? (
              <>
                <li>
                  <Link href='/organizations'> Organizaciones</Link>
                </li>
                <li>
                  <Link href='/profile'>{`Perfíl (${user.name})`}</Link>
                </li>
                <li>
                  <a href='/api/logout'>Salir</a>
                </li>
              </>
              )
            : (
              <li>
                <Link href='/api/login'>Ingresar</Link>
              </li>
              )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
