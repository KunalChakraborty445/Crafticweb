import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const UseGetCurrentUser = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const getCurrentUser = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/user/me`, { withCredentials: true });
                dispatch(setUserData(response.data.user));
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    },[dispatch])


  return (
    <div>
      
    </div>
  )
}

export default UseGetCurrentUser
