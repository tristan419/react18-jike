import { createSlice } from "@reduxjs/toolkit";
// user.js
import { request } from "@/utils/request";
import { getToken, setToken as _setToken, removeToken } from "@/utils";

import { useDispatch } from "react-redux";
import { clear } from "@testing-library/user-event/dist/clear";
import { getProfileAPI, loginAPI } from "@/apis/user";

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
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = {};
            state.token = "";
            removeToken(); //清除token
        }

    } 
})

//解构actionCreater

const { setToken,setUserInfo,clearUserInfo } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步方法获取登陆token
const fetchLogin = (loginForm) => { 
    return async(dispatch)=> {
        //发送异步请求
        const res = await loginAPI(loginForm);
        //提交同步action让token存入
        dispatch(setToken(res.data.token));

    }

}

//获取个人用户信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI();
        // console.log(res.data);
        dispatch(setUserInfo(res.data));
    }
}
export {fetchLogin, setToken,fetchUserInfo, setUserInfo,clearUserInfo};

export default userReducer;