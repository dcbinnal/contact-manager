import Navbar from "../common/UI/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { BookUser } from "lucide-react";

function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-slate-900 to-fuchsia-950 shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer w-full p-2 "
            onClick={() => {
              navigate("/");
            }}
          >
            <BookUser className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg font-semibold text-white">
              Contact Manager
            </h1>
          </div>

          {/* <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Navbar />
            </div>
          </div> */}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
