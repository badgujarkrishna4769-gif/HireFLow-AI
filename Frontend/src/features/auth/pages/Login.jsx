import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Particle from "../components/Particle";

const Login = ()=> {
    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("");

        try {
            const data = await handleLogin({email, password});
            if (data.status === 400) {
                setError(data.message || data.message);
                return;
            }
            if (data.user) {
                navigate("/interview-report");
            }

        }catch(err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
        
    }

    return (
        <main className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="partical-background h-screen w-screen absolute z-0">
                <Particle />
            </div>
                        {
                loading ? (
                    <div className="loading-cont h-screen w-screen absolute top-0 left-0 z-99 backdrop-blur-[3px] flex justify-center items-center">
                        <div className="loading h-[60px] w-[240px] rounded-[20px] bg-[#4e4e4e41] flex justify-center items-center">
                            <div className="loader h-[35px] w-[35px] border-[5px] border-transparent border-t-[#bc5eff] border-r-[#bc5eff] rounded-[50%] mr-[10%]"></div>
                            <span className="text-[1.4rem]">Loading...</span>
                        </div>
                    </div>   
                ) : ""
            }
            <div className="form-container backdrop-blur-[6px] h-fit min-h-[400px] w-fit flex flex-col justify-center items-center  rounded-[20px] py-[30px] px-[20px] z-1">
                <h1 className="self-start text-[3.6rem] font-bold">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group flex flex-col text-[1.2rem] mb-[10px]">
                        <label htmlFor="email">Email: </label>
                        <input className="bg-[#000] w-[26vw] min-w-[280px] h-[40px] outline-none border-none rounded-[5px] px-[5px]" onChange={(e)=> {setEmail(e.target.value)}} type="email" id="email" name="email" placeholder="Enter email address"/>
                    </div>
                    <div className="input-group flex flex-col text-[1.2rem] mb-[30px]">
                        <label htmlFor="password">Password: </label>
                        <input className="bg-[#000] w-[26vw] min-w-[280px] h-[40px] outline-none border-none rounded-[5px] px-[5px]" onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password" name="password" placeholder="Enter password"/>
                    </div>
                    {
                        error && (
                            <p className="text-wrap w-[26vw] text-red-600 mb-[10px]">{error}</p>
                        )
                    }
                    <button className="outline-none border-none rounded-2xl bg-[#9929EA] text-white font-bold hover:bg-[#721ead] transition-all ease-in-out cursor-pointer text-[1.5rem] w-full h-[50px] mb-[20px]">Login</button>
                </form>
                <p className="self-start" >don't have an account? <Link to={"/register"} className="text-[#9929EA]">Register</Link></p>
            </div>
        </main>
    );
}

export default Login;