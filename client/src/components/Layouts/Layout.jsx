import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"

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
