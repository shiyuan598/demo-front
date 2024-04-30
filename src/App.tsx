import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header";
import Release from "./views/release";
import Help from "./views/help";
import Feedback from "./views/feedback";
import "./style/index.scss"

function App() {
    return (
        <>
            <Header />
            <main>
                <Switch>
                    <Route path="/release" render={() => <Release />}></Route>
                    <Route path="/help" render={() => <Help />}></Route>
                    <Route path="/feedback" render={() => <Feedback />}></Route>
                    <Redirect from="/" to="/release" exact></Redirect>
                </Switch>
            </main>
        </>
    );
}

export default App;
