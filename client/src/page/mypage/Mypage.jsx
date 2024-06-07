
import React from "react"
import axios from "axios";
import ProfileUpdate from "./ProfileUpdate";
import Navi from "../../component/navi/Navi";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api';
axios.defaults.withCredentials = true;

const Mypage=()=>{

    return(
        <div>
            <Navi/>
            <h1>마이페이지</h1>
           
            <ProfileUpdate/>
        </div>
    )
}





export default Mypage;