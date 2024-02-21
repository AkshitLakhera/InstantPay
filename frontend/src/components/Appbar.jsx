import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
    const [currentUser,setCurrentUser] =useState();
    useEffect(() => {
        // Corrected syntax here
        const fetchData = async () => {
          try {
            const res=await axios.get('http://localhost:3000/api/v1/user/currentUser', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }                           
            );
            setCurrentUser(res.data.firstName);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, []); 
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            InstantPay
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {currentUser}
                </div>
            </div>
        </div>
    </div>
}