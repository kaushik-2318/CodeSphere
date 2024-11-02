import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getAllTemplates = () => {
    return axios.get(`${API_BASE_URL}/template/getalltemplate`);
};

export const updateLike = (templateId, token) => {
    return axios.put(
        `${API_BASE_URL}/template/updateLike/${templateId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const addBookmark = (templateId, token) => {
    return axios.put(
        `${API_BASE_URL}/template/addbookmark/${templateId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const increaseViews = (templateId) => {
    return axios.put(`${API_BASE_URL}/template/increaseViews/${templateId}`);
};


// Function to send OTP
export const sendEmailOtp = () => {
    return axios.post(`http://localhost:3000/verification/sendemailotp`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

// Function to verify OTP
export const verifyEmailOtp = (otp) => {
    return axios.post(`http://localhost:3000/verification/getemailotp`, { otp }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};