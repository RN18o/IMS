import "./App.css";
import SignUp from "./pages/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserProtectorWrapper from "./pages/UserProtectorWrapper";
import CreateIncident from "./pages/CreateIncident";
import EditIncident from "./pages/EditIncident";
import IncidentList from "./pages/IncidentList";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/createincident"
        element={
          <UserProtectorWrapper>
            <CreateIncident />
          </UserProtectorWrapper>
        }
      />
      <Route
        path="incidents/updateincidents/:id"
        element={
          <UserProtectorWrapper>
            <EditIncident />
          </UserProtectorWrapper>
        }
      />
      <Route
        path="/incidentlist"
        element={
          <UserProtectorWrapper>
            <IncidentList />
          </UserProtectorWrapper>
        }
      />
    </Routes>
  );
};

export default App;
