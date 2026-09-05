import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Ticket from './pages/Ticket.jsx'
import Status from './pages/Status.jsx'
import Admin from './pages/Admin.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CursorDot from './components/CursorDot.jsx'
import Checkin from './pages/Checkin.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <CursorDot />
        <Routes>
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ticket/:ticketId" element={<Ticket />} />
          <Route path="/status" element={<Status />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}