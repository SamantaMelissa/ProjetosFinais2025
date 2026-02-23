import Rotas from "./routes/Routes.jsx";
import { AuthProvider } from "./pages/contexts/authContexts";

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}

export default App;