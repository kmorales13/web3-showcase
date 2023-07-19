import { Routes, Route } from "react-router-dom"
/* Pages */
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import CampaignCreate from "./pages/CampaignCreate"
import CampaignDetails from "./pages/CampaignDetails"
/* Components */
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CampaignCreate />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
