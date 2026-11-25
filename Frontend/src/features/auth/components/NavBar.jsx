import React from "react";
import { useAuth } from "../hooks/useAuth";
import { CircleUserRound } from "lucide-react";
const NavBar = ()=> {
    const {loading, user} = useAuth();

    return (
        <div className="navbar min-h-[65px] h-[6vw] w-full flex justify-between items-center bg-[#0202023a] backdrop-blur-[5px] fixed top-0 left-0 z-99 px-[max(6px,0.9vw)]">
            <span className="h-full p-0">
                <img src="./public/assets/Logo.png" className="h-full" alt="" />
            </span>
            <div className="nav-btn-cont flex items-center gap-[0.8vw]">
                <div className="home-cont"></div>
                {
                    user && (
                        <div className=" flex items-center gap-[0.8vw]">
                            <div className="user-acc h-[70%] flex items-center gap-5 rounded-full text-[1.4rem] bg-[#FCF9EC] p-[2px] pl-[5px] pr-[15px] shadow-[4px_4px_0px_1px_#8E1EA2]">
                                <CircleUserRound size={30} color="#000"/>
                                <span className="username line-clamp-1 text-black font-medium">
                                    {user.username}
                                </span>
                            </div>
                            <button >

                            </button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}

export default NavBar;  