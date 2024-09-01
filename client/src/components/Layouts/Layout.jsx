import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { useAuth } from "../../context/authContext"
import { LoadingPage } from "../Loading/LoadingPage"

export const Layout = () => {

    const { loading } = useAuth()
    if (loading) return <LoadingPage />
    return (

        <div >
            <Header />

            <main className="mt-32 max-w-screen-2xl min-h-screen mx-auto">
                <Outlet />
            </main>

            <Footer />
        </div >
    )
}
