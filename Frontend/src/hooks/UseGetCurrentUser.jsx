import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData, setLoading } from '../redux/userSlice.js' 

const UseGetCurrentUser = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const getCurrentUser = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${serverUrl}/api/v1/user/me`, { withCredentials: true });
                dispatch(setUserData(res.data?.user ?? res.data));
            } catch {
                dispatch(setUserData(null)); 
            } finally {
                dispatch(setLoading(false));
            }
        }
        getCurrentUser();
    },[dispatch])

  return null // ← hooks don't need to return JSX
}

export default UseGetCurrentUser