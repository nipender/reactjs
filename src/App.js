import { Router } from "react-router";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ExportXml from "./Pages/ExportXml";
import CoursesList from "./Pages/CoursesList";
import CourseDetail from "./Pages/CourseDetail"; 
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddBook from "./Pages/AddBook";
import UsersList from "./Pages/UsersList";
import EditBook from "./Pages/EditBook";
import AdminLogin from './Admin/Login';
import Dashboard from './Admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/import-books" component={ExportXml} />
          <Route exact path="/add-book" component={AddBook} />
          <Route exact path="/courses-list" component={CoursesList} />
          <Route exact path="/courses/:slug" component={CourseDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/edit/:slug" component={EditBook} />
          
          {/*============Admin Link==============*/}
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/users-list" component={UsersList} />
          <Route exact path="/admin/courses-list" component={CoursesList} />
           
          

        </Switch>
    </BrowserRouter>
    
  );
}

export default App;
