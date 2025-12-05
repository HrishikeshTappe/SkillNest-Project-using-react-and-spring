import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from './component/Navbar';
import Home from './component/Home';
import Courses from './component/Courses';
import Payment from './component/Payment';
import PaymentSuccess from "./component/PaymentSuccess";
import MyCourses from "./component/MyCourses";
import Footer from './component/Footer';

import Login from "./component/Login";
import Signup from "./component/Signup";

// new dashboards
import UserDashboard from "./component/UserDashboard";
import AdminDashboard from "./component/AdminDashboard";
import Blogs from './component/Blogs';
import AboutUs from './component/AboutUs';
import Contact from './component/Contact';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />

            {/* PAYMENT ROUTES */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/my-courses" element={<MyCourses />} />

            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* DASHBOARDS */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
