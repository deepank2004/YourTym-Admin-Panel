// export const BaseUrl = "https://your-time-project-lime.vercel.app/";
export const BaseUrl = "https://www.yourtym.in/";

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
