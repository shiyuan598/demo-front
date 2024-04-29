import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Detail from './detail';

export default function release() {
  return (
    <>
      <div>release</div>
      <Switch>
        <Route path="/release/detail/:id" component={Detail} />
        <Redirect from="/release" to="/release/detail" exact></Redirect>
      </Switch>
    </>
  )
}
