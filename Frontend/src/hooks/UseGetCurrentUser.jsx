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
                    console.log('UseGetCurrentUser: API response ->', res?.data);

                    const user = res?.data?.user ?? null;
                    dispatch(setUserData(user));
            } catch (err) {
                    console.error('UseGetCurrentUser: API error ->', err?.response?.data ?? err.message);
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