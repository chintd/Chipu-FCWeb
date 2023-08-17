import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Nav from './components/nav';
import Home,{loader as fetchProducts} from './components/home';
import Admin,{action as postAddProduct} from './components/admin';
import Detail, {loader as getDetail} from './components/detail';
import Signin from './components/signIn';
import Search, { action as postSearchTerm} from './components/search';
import "./App.css";
const router = createBrowserRouter([
  {path: "/", element: <Nav/>,
  children:[
    {path:"/", element:<Home/>, loader: fetchProducts},
    {path:"/admin", element: <Admin/>, action: postAddProduct},
    {path: "/search", element: <Search/>,action : postSearchTerm},
    {path: "/detail/:detailId", element:<Detail/>, loader: getDetail},
    {path:"/signin", element: <Signin/>}
  ]}
]);
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
