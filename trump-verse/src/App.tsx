import { ThoughtProvider } from "./contexts/ThoughtContext"
import AppRouting from "./routing/AppRouting"

function App() {
  return (
    <>
      <ThoughtProvider>
        <AppRouting/>
      </ThoughtProvider> 
    </>
  )
}

export default App
