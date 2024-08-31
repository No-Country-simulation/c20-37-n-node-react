import { Outlet } from "react-router-dom"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"

export const Layout = () => {
    return (

        <div >
            <Header />

            <main className="mt-32 max-w-6xl h-screen mx-auto">
                <Outlet />
            </main>

            <Footer />
        </div >
    )
}
