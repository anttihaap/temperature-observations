import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import AdminPage from "./components/admin/AdminPage";
import Header from "./components/header/Header";
import Layout from "./components/Layout";

class App extends React.Component {

  render = () => {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/admin' component={AdminPage} />
          </Switch>

        </Layout>
      </BrowserRouter>
    );
  }

}

render(<App />, window.document.getElementById("app"));
