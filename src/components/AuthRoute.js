//封装高阶组件
//核心逻辑 有效的token就放行，没有token就跳转到登录页面

import { getToken } from "@/utils";
import { Navigate, useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
    const token = getToken();
    // const navigate = useNavigate();
    if (token) {
        // console.log(token);
        return <>{children}</>;
    } else {
        return <Navigate to="/login" replace/>;
    }
}

export default AuthRoute;