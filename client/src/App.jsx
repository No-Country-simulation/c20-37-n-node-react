import { AuthProvider } from "./context/authContext"
import { Router } from "./Router"

function App() {

  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  )
}

export default App
