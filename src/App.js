import { Switch, Route, Redirect } from 'react-router-dom';
import Release from "./pages/release";
import Help from "./pages/help";

function App() {
  return (
    <Switch>
      <Route path="/release" render={() => (<Release />)}></Route>
      <Route path="/help" render={() => (<Help />)}></Route>
      <Redirect from="/" to="/release" exact></Redirect>
    </Switch>
  );
}

export default App;
