import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import MobileHome from "./pages/MobileHome";
import NotFound from "./pages/NotFound"
import { Provider } from "react-redux";
import configureStore from "./redux/store"
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ProjectHome from "./pages/ProjectHome";
import AddProject from "./pages/AddProject";
import ChangePassword from "./pages/ChangePassword";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute restricted={true} path="/signup" component={Signup} />
          <PublicRoute restricted={true} path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/home" component={Home} mobileComponent={MobileHome} />
          <PrivateRoute exact path="/settings" component={SettingsPage} />
          <PrivateRoute path="/settings/changepassword" component={ChangePassword} />
          <PrivateRoute exact path="/project/addproject" component={AddProject} />
          <PrivateRoute path="/project/:id" component={ProjectHome} />
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
