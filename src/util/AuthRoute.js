import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({component: Componet, authenticated, ...rest}) =>(
  <Route
  {...rest}
  render={(props) => authenticated ? <Redirect to='/' /> : <Componet {...props}/>}
  />
)

export default AuthRoute
