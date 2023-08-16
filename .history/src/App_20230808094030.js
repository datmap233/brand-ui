import { Fragment, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/layouts/layout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.components;
            let Layout = DefaultLayout;
            if (route.layout) Layout = route.layout;
            else if (route.layout === null) Layout = Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout page={Page}></Layout>}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
