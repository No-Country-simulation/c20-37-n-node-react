import { AuthProvider } from "./context/authContext"
import { GeneralProvider } from "./context/generalContext"
import { UsersProvider } from "./context/usersContext"
import { Router } from "./Router"


function App() {

  return (
    <>
      <GeneralProvider>
        <AuthProvider>
          <UsersProvider>
            <Router />
          </UsersProvider>
        </AuthProvider>
      </GeneralProvider>
    </>
  )
}

export default App
