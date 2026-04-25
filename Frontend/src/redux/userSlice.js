import { createSlice } from "@reduxjs/toolkit";



const useSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
         loading: true,
    },
    reducers:{
        setUserData: (state, action)=>{
            state.userData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})


export const { setUserData, setLoading } = useSlice.actions;

export default useSlice.reducer;