// import AuthPage from "./pages/Auth"
// import AnimatedCard from "./test/AnimatedCard"
// import ThemeSwitcher from "./test/ThemeSwitcher"


import { RouterProvider } from "react-router-dom"
import router from "./router/router"


const App = () => {
  return (
    <>
      {/* <AuthPage/> */}
      {/* <ThemeSwitcher/> */}
      {/* <AnimatedCard/> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App