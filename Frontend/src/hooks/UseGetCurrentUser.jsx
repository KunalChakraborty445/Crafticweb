import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'

const UseGetCurrentUser = () => {

    useEffect(()=>{
        const getCurrentUser = async () => {
            try {
                const responce = await axios.get(`${serverUrl}/api/v1/user/me`,
                    {withCredentials: true}
                )
                console.log(responce);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    },[])


  return (
    <div>
      
    </div>
  )
}

export default UseGetCurrentUser
