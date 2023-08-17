import { NavLink, Outlet, Form, useLoaderData } from "react-router-dom";
import "../css/nav.css";

 const Nav = ()=>{
    const login = useLoaderData();;
    console.log(login, "login user")
    return <div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" activeclassname="active">Chipu FC</NavLink>
                  
                </li>
                <li>
                <Form action="/search" method="POST" className="search">
                        <input type="text" name="search" placeholder="search"></input>
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </button>
                </Form>
                </li>
                <li>
                    <div className="upload">
                    <NavLink to="/admin" activeclassname="active">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                        </svg>
                    </NavLink>
                    </div>
                    {login?  <div className="avatar">
                        <img src="" alt=""/>
                    </div> : 
                    <div className="signIn">
                        {login ? <NavLink to={`/user/info/${login.id}`} activeclassname="active"> 
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            </i>
                            <p>{login.id}</p>
                        </NavLink> : 
                          <NavLink to="/signin" activeclassname="active">
                          <i>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
  
                          </i>
                          <p>Sign In</p>
                      </NavLink>}
                  
                  </div>}                                       
                </li>
               
            </ul>
        </nav>
        <div className="container">

        <Outlet/>
        </div>
    </div>
 }

 export default Nav;

export async function loader(){
    try{
        const res = await fetch("http://localhost:5000/user/login");
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err)
    }
}