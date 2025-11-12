import AppRoutes from "@/routes/AppRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import './App.css'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="">
        <AppRoutes />
      </div>
    </ThemeProvider>

  )
}

export default App