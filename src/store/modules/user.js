import { createSlice } from "@reduxjs/toolkit";
// user.js
import { request } from "@/utils/request";
import { getToken, setToken as _setToken, removeToken } from "@/utils";

import { useDispatch } from "react-redux";

const userStore = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        token: getToken() || "",
    },
    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload); //存储token到localStorage
        }
    } 
})

//解构actionCreater

const { setToken } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步方法获取登陆token
const fetchLogin = (loginForm) => { 
    return async(dispatch)=> {
        //发送异步请求
        const res = await request.post("/authorizations",loginForm)
        //提交同步action让token存入
        dispatch(setToken(res.data.token));

    }

}

export {fetchLogin, setToken}

export default userReducer;