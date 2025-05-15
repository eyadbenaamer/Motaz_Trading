import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Home from "pages/home";
import Login from "pages/login";
import Signup from "pages/signup";
import VerifyAccount from "pages/verify-account";
import ResetPassword from "pages/reset-password";
import Dashboard from "pages/dashboard";
import Inventories from "pages/inventories";
import Summary from "pages/summary";
import NotFound from "pages/NotFound";

import InfoMessage from "components/InfoMessage";

import useUpdate from "hooks/useUpdate";
import Invoices from "pages/Invoices";

const App = () => {
  //if user is stored in redux state, then the user is logged in
  const { isLoggedin, isVerified } = useSelector((state) => state.authStatus);

  /*
  this hook responsible for updating notifications and conversions
  and checking of authentication token once the app is loaded.
  */
  useUpdate();

  return (
    <BrowserRouter>
      <div className="App">
        <motion.main
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                !isLoggedin ? (
                  <Login />
                ) : isLoggedin && !isVerified ? (
                  <Navigate to="/verify-account" />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isLoggedin ? <Signup /> : <Navigate to="/dashboard" replace />
              }
            />
            <Route
              path="/verify-account"
              element={
                isLoggedin && !isVerified ? (
                  <VerifyAccount />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/reset-password"
              element={
                !isLoggedin ? <ResetPassword /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                !isLoggedin ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedin && isVerified ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/inventory"
              element={
                isLoggedin && isVerified ? (
                  <Inventories />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/invoices"
              element={
                isLoggedin && isVerified ? (
                  <Invoices />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/summary"
              element={
                isLoggedin && isVerified ? (
                  <Summary />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InfoMessage />
        </motion.main>
      </div>
    </BrowserRouter>
  );
};
export default App;
