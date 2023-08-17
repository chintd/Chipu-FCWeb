import { useState } from "react";
import "../css/signin.css";
import { redirect } from "react-router-dom";
const Signin = ()=>{
    const [page, setPage] = useState("Sign In");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail]=useState(true);
    const [invalidPass, setInvalidPass] = useState(true)
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPass, setTouchedPass] = useState(false);
    const hasError = invalidEmail && touchedEmail;
    const passHasError = invalidPass && touchedPass;
    function emailBlurHandler(){
        setTouchedEmail(true)
    }
    function emailHandler(e){
        console.log(e.target.value.includes("@"), e.target.value)
        if(e.target.value.includes("@") && touchedEmail){
            setEmail(e.target.value);
            setInvalidEmail(false)
        }else{
            setInvalidEmail(true)
            setTouchedEmail(false)
        }
    }
    function passBlurHandler(){
        setTouchedPass(true)
    }
    function passwordHandler(e){
        console.log(e.target.value)
        if(e.target.value !== "" && touchedPass){
            setPassword(e.target.value);
            setInvalidPass(false)
        }else{
            setTouchedPass(false)
            setInvalidPass(true)
        }
    }
    async function submitHandler(e){
        e.preventDefault();
        console.log("signin", email, password);
        if(touchedEmail && touchedPass 
            && !invalidEmail && !invalidPass){
                try{
                    await fetch(`http://localhost:5000/user/${page === "Sign In"? "login" :"register"}`, {
                        headers:{
                            "content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        method:"POST"
                    })
                }catch(err){
                    console.log(err)
                }
                
                if(page === "Sign In"){
                    return redirect("/")
                }else{
                    setPage("Sign In");
                }
            }
    }
    function reset(){
        setEmail("");
        setPassword("");
        setTouchedEmail(false);
        setTouchedPass(false);
        setInvalidEmail(true);
        setInvalidPass(true)
    }
    function toggleHandler(){
        if(page === "Sign In"){
            reset()
            return setPage("Register")
        }else{
            reset()
            setPage("Sign In")
        }
    }
    return <div className="signin-form">
        {page === "Sign In" ? <form onSubmit={submitHandler}>
            <h3>{page}</h3>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={emailHandler}
            onBlur={emailBlurHandler} id="email"/>
            <p className="red-text">{hasError ? 'invalid Email'  : ""}</p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" 
            onBlur={passBlurHandler} onChange={passwordHandler}/>
             <p className="red-text">{passHasError ? "Invalid Password" : ""}</p> 
            <div className="action-control">
                <button className="changePage" onClick={toggleHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Register 
                </button>
                <button className="btn"type="submit">Log In</button>
            </div>
        </form> : <form onSubmit={submitHandler}>
            <h3>{page}</h3>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={emailHandler}
            onBlur={emailBlurHandler} id="email"/>
             <p className="red-text">{hasError ? 'invalid Email'  : ""}</p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" 
            onBlur={passBlurHandler} onChange={passwordHandler}/>
             <p className="red-text">{passHasError ? "Invalid Password" : ""}</p> 
            <div className="action-control">
                <button className="changePage" onClick={toggleHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Sign In 
                </button>
                <button className="btn"type="submit">Register</button>
            </div>
        </form>}
        
    </div>
}

export default Signin