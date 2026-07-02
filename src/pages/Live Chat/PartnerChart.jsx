import React, { useCallback, useEffect, useRef, useState } from 'react';
import HOC from '../../components/HOC/HOC';
import { IoIosSend } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { doc, onSnapshot, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../components/Firebase/Firebase-config';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { formatDistanceToNow } from 'date-fns';
import img1 from '../../assest/user.webp';
import img2 from '../../assest/loading1.gif';

import { formatDatemessage, getFormattedTime, isToday2, isYesterday2 } from '../../utils/utils';
import { Link } from 'react-router-dom';


const PartnerChart = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const [selectedUser, setSelectedUser] = useState({
        name: 'user',
        img: img1,
        id: null,
    });
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [limit, setLimit] = useState('');

    const messageContainerRef = useRef(null);
    const adminData = JSON.parse(localStorage.getItem("adminProfile")) || {};



    const fetchData = useCallback(async () => {
        setUserData([]);
        setLoading(true);


        await getApi(endPoints.getallPartner(pagination.page, limit, searchQuery), {
            setResponse: async (response) => {
                setLimit(response?.pagination?.totalDocs);
                const users = response?.data || [];

                // Fetch last messages for all users
                const updatedUsers = await Promise.all(
                    users.map(async (user) => {
                        try {
                            const chatId = `${user._id}_${adminData?.data?._id}`;
                            const chatRef = doc(db, "chats", chatId);

                            return new Promise((resolve) => {
                                const unsubscribe = onSnapshot(chatRef, (docSnapshot) => {
                                    if (docSnapshot.exists()) {
                                        const messages = docSnapshot.data().messages || [];
                                        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
                                        resolve({
                                            ...user,
                                            lastMessage: lastMessage?.message || 'No messages yet',
                                            lastMessageTime: lastMessage?.timestamp || null,
                                            tag: lastMessage?.tag || null
                                        });
                                    } else {
                                        resolve({ ...user, lastMessage: 'No messages yet', lastMessageTime: null });
                                    }
                                });

                                // Cleanup listener when component unmounts
                                return () => unsubscribe();
                            });
                        } catch (error) {
                            console.error(`Error fetching last message for user ${user._id}:`, error);
                            return { ...user, lastMessage: 'Error loading message', lastMessageTime: null };
                        }
                    })
                );

                setUserData(updatedUsers);
            },
            setLoading,
            errorMsg: 'Failed to fetch user!',
        });
    }, [pagination.page, limit, searchQuery, adminData?.data?._id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (selectedUser && adminData?.data?._id) {
            const chatId = `${selectedUser.id}_${adminData?.data?._id}`;
            const chatRef = doc(db, "chats", chatId);

            const unsubscribe = onSnapshot(chatRef, (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages || []);
                } else {
                    setMessages([]);
                }
            });

            return () => unsubscribe();
        }
    }, [selectedUser, adminData?.data?._id]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };

    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };



    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !selectedUser) return;

        const chatId = `${selectedUser.id}_${adminData?.data?._id}`;
        const chatRef = doc(db, "chats", chatId);

        try {
            await setDoc(
                chatRef,
                {
                    messages: arrayUnion({
                        senderId: adminData?.data?._id,
                        senderName: adminData?.data?.fullName,
                        message: newMessage,
                        timestamp: new Date().toISOString(),
                    }),
                },
                { merge: true }
            );

            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    };

    const getTimeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };


    const handleScroll = () => {
        const container = messageContainerRef.current;
        if (container) {
            const isNearBottom =
                container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
            setIsAtBottom(isNearBottom); // Set the state to true only if the user is near the bottom
        }
    };


    const selecteduser = (user) => {
        setSelectedUser({
            name: user?.user?.fullName || 'User',
            img: user?.user?.image || img1,
            id: user?.user?._id || null,
        });
        setMessages([]);
        scrollToBottom();
    };

    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom(); // Auto-scroll only if the user is at the bottom
        }
    }, [messages]);

    const groupedMessages = messages.reduce((acc, msg) => {
        const messageDate = new Date(msg.timestamp);
        let groupKey;

        if (isToday2(messageDate)) {
            groupKey = "Today";
        } else if (isYesterday2(messageDate)) {
            groupKey = "Yesterday";
        } else {
            groupKey = formatDatemessage(messageDate);
        }

        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }

        acc[groupKey].push(msg);
        return acc;
    }, {});


    return (
        <div className='userlistcontainer'>
            <div className='userlist1'>
                <div className='userlist2'>
                    <h6>Live Chat</h6>
                </div>
            </div>

            <div className='servicetnasctioncontainer'>
                <Link to={'/live-chat/user'} className='link'>
                    <div className='servicetnasction'>
                        <h6>User Chat</h6>
                    </div>
                </Link>
                <Link to={'/live-chat/partner'} className='link'>
                    <div className='servicetnasctionactive'>
                        <h6>Partner Chat</h6>
                    </div>
                </Link>
            </div>

            <div className='livechart-container'>
                <div className='livechart-left'>
                    <div style={{ display: 'flex', alignItems: "center", gap: "0.5rem" }}>
                        <div className='livechart-left-search'>
                            <IoSearch color='#979797' size={20} />
                            <input
                                type="search"
                                placeholder="Search by name or ID"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <button className="search-button" onClick={handleSearch}>Search</button>
                    </div>

                    <div className='livechart-left-main'>
                        {loading ? (
                            <div className='normalloading'>
                                <img src={img2} alt="Loading..." />
                            </div>
                        ) : userData?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            userData.map((user, index) => (
                                <div
                                    className={`livechart-left-div-users ${selectedUser?._id === user?.user?._id ? 'active' : ''}`}
                                    key={index}
                                    onClick={() => selecteduser(user)}
                                >
                                    <div className='livechart-left-username'>
                                        <div className='livechart-left-username-img'>
                                            <img src={user?.user?.image || img1} alt="" />
                                        </div>
                                        <div className='livechart-left-username-name'>
                                            <h6>{user?.user?.fullName || 'Username'}</h6>
                                            <p>{user?.lastMessage}</p>
                                        </div>
                                    </div>
                                    <span>{user?.lastMessageTime ? getTimeAgo(user.lastMessageTime) : ''}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className='livechart-right'>
                    <div className='livechart-right-profile'>
                        <div className='livechart-right-image'>
                            <img src={selectedUser?.image} alt="Profile" />
                        </div>
                        <h6>{selectedUser?.name}</h6>
                    </div>

                    <div className="chat-right-main" ref={messageContainerRef} onScroll={handleScroll}>
                        {Object.entries(groupedMessages).map(([date, msgs]) => (
                            <div key={date}>
                                {/* Date Header */}
                                <div className="chat-date-header">
                                    <span>{date}</span>
                                </div>

                                {/* Messages for the Date */}
                                {msgs.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`chat-right-message-${msg.senderId === adminData?.data?._id ? "right" : "left"}`}
                                    >
                                        {msg.senderId === adminData?.data?._id ? (
                                            <>
                                                <div className="chat-right-right-msg-div-div">
                                                    <p>{msg.message}</p>
                                                    <span>{getFormattedTime(msg.timestamp)}</span>
                                                </div>
                                                <div className="chat-right-right-msg-img">
                                                    <img src={msg.senderProfilePic} alt={msg.senderName} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="chat-right-left-msg-img">
                                                    <img src={msg.senderProfilePic} alt={msg.senderName} />
                                                </div>
                                                <div className="chat-right-left-msg-div-div">
                                                    <p>{msg.message}</p>
                                                    <span>{getFormattedTime(msg.timestamp)}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className='livechart-right-messagetype'>
                        <BsEmojiSmile size={22} />
                        <input
                            type="text"
                            placeholder='Message'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <IoIosSend onClick={handleSendMessage} size={25} color='#F05423' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HOC(PartnerChart);
