import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/home/home";
// import Signup from "./components/signin signup/signup";
import Signin from "./components/signin";
// import Profile from "./components/profile/profile";
// import EditProfile from "./components/editProfile";
// import Navbar from "./components/navbar/navbar";

function App() {
  // const signedIn = localStorage.getItem("signedIn");
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={signedIn === "true" ? <Home /> : <Navigate to="/signin" />}
        /> */}
        {/* <Route path="/nav" element={<Navbar />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signin" element={<Signin />} />
        {/* <Route path={"/edit-profile"} element={<EditProfile />} /> */}
        {/* <Route path={"/*"} element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
