import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const MainLayout = () => {
    return (
        <div>
            <nav className="w-full fixed top-0 z-10 bg-amber-400/40 backdrop-blur-3xl">
                <Navbar></Navbar>
            </nav>
            <main className="md:w-11/12 mx-auto">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;