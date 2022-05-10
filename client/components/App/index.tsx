import React, { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import NoMatch from "@components/NoMatch";
import RequireAuth from "@components/RequireAuth";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
