import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Home from "pages/home";
import Login from "pages/login";
import User from "pages/user";
import ManageInventories from "pages/manage-inventories";
import ManageInvoices from "pages/manage-invoices";
import ManageTransactions from "pages/manage-transactions";
import NotFound from "pages/NotFound";

const App = () => {
  //if user is stored in redux state, then the user is logged in
  const isLoggedin = useSelector((state) => state.token);

  return (
    <BrowserRouter>
      <div className="App">
        <motion.main
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <Routes>
            <Route
              path="/login"
              element={!isLoggedin ? <Login /> : <Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={isLoggedin ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/user"
              element={isLoggedin ? <User /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/manage-inventories"
              element={
                isLoggedin ? (
                  <ManageInventories />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/manage-invoices"
              element={
                isLoggedin ? (
                  <ManageInvoices />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/manage-transactions"
              element={
                isLoggedin ? (
                  <ManageTransactions />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="not-found" element={<NotFound />} />
          </Routes>
        </motion.main>
      </div>
    </BrowserRouter>
  );
};
export default App;
