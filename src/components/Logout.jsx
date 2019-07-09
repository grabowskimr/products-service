import React from 'react'
import { useCookies } from 'react-cookie';

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  
  const logout = () => {
    removeCookie('login', {path: '/'});
  }

  return (
    <button className="button" title={cookies.login} onClick={logout}>Wyloguj</button>
  )
}


export default Logout;