import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { CitesProvider } from "./Context/CitesContext"
import { AuthProvider } from "./Context/FakeAuthContext"
import { Suspense, lazy } from "react"
const BASE_URL="http://localhost:9000/"
import CityList from "./commponts/CityList"
import CountryList from "./commponts/CountryList"
import City from "./commponts/City"
import Form from "./commponts/Form"
import ProtectRoute from "./commponts/ProtectRoute"
import SpinerFullpage from "./commponts/SpinnerFullPage"

// import Homepaging from "./pages/Homepage"
// import Applayout from "./pages/Applayout"
// import Pagenotfound from "./pages/PageNotFound"
// import Product from "./pages/product"
// import Pricing from "./pages/Pricing"
// import Login from "./pages/Login"

const Homepaging=lazy(()=>import("./pages/Homepage"))
const Applayout=lazy(()=>import("./pages/Applayout"))
const Pagenotfound=lazy(()=>import("./pages/PageNotFound"))
const Login=lazy(()=>import("./pages/Login"))
const Pricing=lazy(()=>import("./pages/Pricing"))
const Product=lazy(()=>import("./pages/product"))

function App() {


 return(
 <div>
 <CitesProvider>

  <AuthProvider>
 
   <BrowserRouter>
   <Suspense fallback={<SpinerFullpage/>}>

 <Routes>
  <Route path="Product"element={<Product/>}/>
  <Route path="Homepaging"element={<Homepaging/>}/>
  <Route path="Pricing" element={<Pricing/>} />

  <Route path="Login" element={<Login/>} />
  <Route path="app" element={<ProtectRoute>
    <Applayout/>
  </ProtectRoute>  }>

   <Route index element={<Navigate replace to={"cities"} />} />
   <Route path="cities" element={<CityList/>} />
   <Route path="cities/:id" element={<City/> } />
   <Route path="countries" element={<CountryList/>} />
   <Route path="form" element={<Form/>} />
   
      
    </Route> 
  <Route index element={<Homepaging/>} />
  <Route path="*" element={<Pagenotfound/>} />



 </Routes>

 
   </Suspense>
 </BrowserRouter>
  </AuthProvider>
  </CitesProvider>
 </div>

   )
}

export default App
