import axios from "axios";

// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://codesphere-backend.vercel.app";


// Function to get all template
export const getAllTemplatesapi = async () => {
    return await axios.get(`${API_BASE_URL}/template/getalltemplate`);
};


// Function to Update Like
export const updateLikeapi = async (templateId, token) => {
    return await axios.put(`${API_BASE_URL}/template/updateLike/${templateId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


// Function to add Bookmark
export const addBookmarkapi = async (templateId, token) => {
    return await axios.put(
        `${API_BASE_URL}/template/addbookmark/${templateId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


// Function to Increase Views
export const increaseViewsapi = async (templateId) => {
    return await axios.put(`${API_BASE_URL}/template/increaseViews/${templateId}`);
};


// Function to send OTP
export const sendEmailOtpapi = async () => {
    return await axios.post(`${API_BASE_URL}/verification/sendemailotp`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


// Function to verify OTP
export const verifyEmailOtpapi = async (otp) => {
    return await axios.post(`${API_BASE_URL}/verification/getemailotp`, { otp }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


// Function to get user profile
export const getUserProfileapi = async (location) => {
    const username = location.pathname.split("/profile/")[1];
    return await axios.get(`${API_BASE_URL}/profile/${username}`);
}

//Function to Create Template
export const createTemplateapi = async (data) => {
    return await axios.post(`${API_BASE_URL}/template/createtemplate`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


//Function to get Particuar Template
export const getTemplateapi = async (id) => {
    return await axios.get(`${API_BASE_URL}/template/${id}`);
};


//Funtion to get Login User Profile
export const getLoginUserProfileapi = async () => {
    return await axios.get(`${API_BASE_URL}/profile/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


//Function for Logout
export const logoutapi = async () => {
    return await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


//Function to Update Login User Profile
export const updateLoginUserProfileapi = async (data) => {
    return await axios.put(`${API_BASE_URL}/profile/update`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
    });
};


//Function to get Bookmark
export const getBookmarkapi = async () => {
    return await axios.get(`${API_BASE_URL}/template/getBookmark`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


//Function to Signup
export const signupapi = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/register`, data);
};


//Function to Login
export const loginapi = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/login`, data,{
        headers: {
            "Content-Type": "application/json",
        }
    });
};

//Function to get Views
export const getViewsapi = async () => {
    return await axios.get(`${API_BASE_URL}/template/getViews`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};