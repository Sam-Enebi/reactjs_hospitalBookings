import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import routes from "./routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route
            path={route.path}
            element={
              route.isPrivate ? (
                <PrivateRoute>
                  {/* Handling private routes */}
                  <route.component />
                </PrivateRoute>
              ) : (
                <route.component />
              )
            }
            key={route.path}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
