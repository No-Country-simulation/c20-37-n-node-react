import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { LoadingPage } from "../Loading/LoadingPage"
import { useGeneralContext } from "../../hooks/useGeneralContext"

export const Layout = () => {

    const { loading } = useGeneralContext()
    if (loading) return <LoadingPage />
    return (

        <div >
            <Header />
            <main className="max-w-screen-2xl w-full min-h-screen mx-auto my-16">
                <Outlet />
            </main>
            <Footer />
        </div >
    )
}
