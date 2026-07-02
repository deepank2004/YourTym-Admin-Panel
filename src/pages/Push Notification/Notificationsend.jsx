import React, { useCallback, useEffect, useState } from "react";
import endPoints from "../../Repository/apiConfig";
import { getApi, postApi } from "../../Repository/Api";

const Notificationsend = ({fetchData}) => {
    const [total, setTotal] = useState("");
    const [sendTo, setSendTo] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sendVia, setSendVia] = useState("");
    const [expireIn, setExpireIn] = useState("");
    const [userId, setUserId] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [userOptions, setUserOptions] = useState([]);
    const [partnerOptions, setPartnerOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [limit] = useState(10);

    const resetForm = () => {
        setTotal("");
        setSendTo("");
        setTitle("");
        setContent("");
        setSendVia("");
        setExpireIn("");
        setUserId("");
        setPartnerId("");
    };

    const fetchUser = useCallback(async () => {
        await getApi(endPoints.getallUser(1, limit), {
            setResponse: (response) => setUserOptions(response?.data || []),
            setLoading,
            errorMsg: "Failed to fetch users!",
        });
    }, [limit]);

    const fetchPartner = useCallback(async () => {
        await getApi(endPoints.getallPartner(1, limit), {
            setResponse: (response) => setPartnerOptions(response?.data || []),
            setLoading:setLoading1,
            errorMsg: "Failed to fetch partners!",
        });
    }, [limit]);

    useEffect(() => {
        fetchUser();
        fetchPartner();
    }, [fetchUser, fetchPartner]);

    const handleSubmit = async () => {
        if (loading2) return;
        const fields = {
            title,
            total,
            sendTo,
            content,
            sendVia,
            expireIn,
            ...(total === "SINGLE" && { _id: sendTo === "USER" ? userId : partnerId })
        };

        await postApi(endPoints.addNotification, fields, {
            setLoading:setLoading2,
            successMsg: "Notification sent successfully!",
            errorMsg: "Failed to send notification!",
        });
        resetForm();
        fetchData();
    };

    return (
        <div className="userprofilecontainer">
            <div className='partnerprofile-container'>
                <div className='userprofile-header'>
                    <h6>Push Notification</h6>
                </div>
                <div className='addserivce-btn'>
                    <button
                        disabled={loading2}
                        onClick={handleSubmit} >
                        {loading2 ? "Sending..." : "Send Notification"}
                    </button>
                </div>
            </div>

            <div className="notificationsendcontainer">
                <div className="notificationsend">
                    <div className="notificationsendinputs">
                        <label>Send to</label>
                        <select value={total} onChange={(e) => setTotal(e.target.value)}>
                            <option value="">Choose</option>
                            <option value="ALL">All Users</option>
                            <option value="SINGLE">Single User</option>
                        </select>
                    </div>

                    <div className="notificationsendinputs">
                        <label>User Type</label>
                        <select value={sendTo} onChange={(e) => setSendTo(e.target.value)}>
                            <option value="">Choose</option>
                            <option value="PARTNER">Partner</option>
                            <option value="USER">User</option>
                        </select>
                    </div>

                    {sendTo === "USER" && total === "SINGLE" && (
                        <div className="notificationsendinputs">
                            <label>Select User</label>
                            <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                                <option value="">Select</option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : userOptions.length === 0 ? (
                                    <option>No data</option>
                                ) : (
                                    userOptions.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.user?.fullName}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}

                    {sendTo === "PARTNER" && total === "SINGLE" && (
                        <div className="notificationsendinputs">
                            <label>Select Partner</label>
                            <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
                                <option value="">Select</option>
                                {loading1 ? (
                                    <option>Loading...</option>
                                ) : partnerOptions.length === 0 ? (
                                    <option>No data</option>
                                ) : (
                                    partnerOptions.map((partner) => (
                                        <option key={partner._id} value={partner._id}>
                                            {partner.user?.fullName}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}

                    <div className="notificationsendinputs">
                        <label>Notification Title</label>
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="notificationsendinputs">
                        <label>Send Via</label>
                        <select value={sendVia} onChange={(e) => setSendVia(e.target.value)}>
                            <option value="">Choose</option>
                            <option value="NOTIFICATION">Notification</option>
                            <option value="FCM">FCM</option>
                        </select>
                    </div>

                    <div className="notificationsendinputs">
                        <label>Expire In</label>
                        <input type="date" value={expireIn} onChange={(e) => setExpireIn(e.target.value)} />
                    </div>
                </div>
                <div className="notificationsendinputs">
                    <label>Description</label>
                    <textarea placeholder="Write a description" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
            </div>
        </div>
    );
};

export default Notificationsend;
