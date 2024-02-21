import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Balance = () => {
    const [balance,setBalance] =useState("");
    useEffect(() => {
        // Corrected  written syntax here
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance',  {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
              }
          });
            setBalance(response.data.balance);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };    
        // Call the fetchData function
        fetchData();
      }, []); 
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}