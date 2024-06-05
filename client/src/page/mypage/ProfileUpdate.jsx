import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ProfileImageUpload from "./ImageUpload";


axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api';
axios.defaults.withCredentials = true;

const ProfileUpdate = () => {
    const { user,dispatch } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        username: user?.username || '',
        email: user?.email || '',
        profileImage: user?.profileImage || ''
        
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/mypage2/getprofile2', {
                    withCredentials: true
                });
                const user=await response.data;
                if (user) {
                    setUserInfo({
                        username: response.data.user.username || '',
                        email: response.data.user.email || '',
                        profileImage:response.data.user.profileImage || ''
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUserInfo();
    }, [user]);

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            console.log("변경유저정보 : ",userInfo);
            const response = await axios.put(`/mypage2/${user._id}`, userInfo, {
                withCredentials: true
            });
            alert("정보가 업데이트되었습니다.");
            dispatch({type:"LOGIN_SUCCESS", payload:userInfo})
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <ProfileImageUpload/>
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    이름
                    <input type="text" name="username" value={userInfo.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    이메일
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                </label>
                <br />
              
                <br />
                <button type="submit">정보 수정</button>
            </form>
        </div>
    );
};

export default ProfileUpdate;