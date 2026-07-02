
import Modal from "react-bootstrap/Modal";
import './Modals.css'
import { toast } from 'react-toastify';
import { FiUpload } from "react-icons/fi";


import { IoMdClose } from "react-icons/io";

import img from '../../assest/img20.png'
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import { postApi, putApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { formatDate, useDebounce } from "../../utils/utils";



import img1 from '../../assest/user.webp'
import Calendar from "react-calendar";
import { FaEdit } from "react-icons/fa";





const ViewDescription = (props) => {
    const { data, onHide } = props;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header" style={{ borderBottom: "1px solid black", marginBottom: "10px", paddingBottom: "1rem" }}>
                        <h6>View Description</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>

                    <div className='description-content'>
                        {/* Render the HTML content */}
                        <div
                            dangerouslySetInnerHTML={{ __html: data }}
                            className="styled-description"
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteConfirmation = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='delete-confirmation-container'>
                    <div className="delete-confirmation-header">
                        <h6>Confirm Deletion</h6>
                        <IoMdClose size={25} onClick={props.onHide} />
                    </div>
                    <div className="delete-confirmation-content">
                        <p>Are you sure you want to delete this data? This action cannot be undone.</p>
                    </div>
                    <div className="delete-confirmation-buttons">
                        <button
                            className="cancel-btn"
                            onClick={props.onHide}
                        >
                            No, Cancel
                        </button>
                        <button
                            className="confirm-btn"
                            onClick={props.onConfirm}
                            disabled={props.loading}
                        >
                            {props.loading ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
const LogoutConfirmation = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='delete-confirmation-container'>
                    <div className="delete-confirmation-header">
                        <h6>Confirm Logout</h6>
                        <IoMdClose size={25} onClick={props.onHide} />
                    </div>
                    <div className="delete-confirmation-content">
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="delete-confirmation-buttons">
                        <button className="cancel-btn" onClick={props.onHide}>
                            No, Cancel
                        </button>
                        <button
                            className="confirm-btn"
                            onClick={props.onConfirm}
                            disabled={props.loading}
                        >
                            {props.loading ? "Logging out..." : "Yes, Logout"}
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const CalendarView = (props) => {
    const { onHide, onSelectDate, dateRange } = props;


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ background: "#FF5534", borderRadius: "5px" }}>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header" style={{ borderBottom: "1px solid white", marginBottom: "10px", paddingBottom: "1rem" }}>
                        <h6 style={{ color: "#FFF" }}>Select  Date</h6>
                        <IoMdClose color="white" size={25} onClick={onHide} />
                    </div>
                    <div className='description-content'>
                        <div className="Calendar-custome">
                            <Calendar
                                selectRange
                                onChange={onSelectDate}
                                value={dateRange}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


const DetailsReferral = (props) => {

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>Details of the referral</h6>
                        <IoMdClose size={25} onClick={props.handleClose} />
                    </div>
                    <div className="referralusermodal-main">
                        <div className="referralusermodal-image-img">
                            <div className="referralusermodal-image">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div">
                                <h6>User name</h6>
                                <span>:</span>
                                <p>Wade Warren</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>User Type</h6>
                                <span>:</span>
                                <p>User</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Refer ID</h6>
                                <span>:</span>
                                <p>zz08y3</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Reward</h6>
                                <span>:</span>
                                <p>₹150</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Status </h6>
                                <span>:</span>
                                <p style={{ color: "#3FB031" }}>Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const DetailsReferralPending = (props) => {

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>Details of the referral</h6>
                        <IoMdClose size={25} onClick={props.handleClose} />
                    </div>
                    <div className="referralusermodal-main">
                        <div className="referralusermodal-image-img">
                            <div className="referralusermodal-image">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div">
                                <h6>User name</h6>
                                <span>:</span>
                                <p>Wade Warren</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>User Type</h6>
                                <span>:</span>
                                <p>User</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Refer ID</h6>
                                <span>:</span>
                                <p>zz08y3</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Reward</h6>
                                <span>:</span>
                                <p>₹150</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Status </h6>
                                <span>:</span>
                                <p style={{ color: "#E1B913" }}>Pending</p>
                            </div>
                        </div>
                        <div className="referralusermodal-btns">
                            <button onClick={props.handleClose} className="done">Verify</button>
                            <button onClick={props.handleClose} className="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
const DetailsReferralFailed = (props) => {

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>Details of the referral</h6>
                        <IoMdClose size={25} onClick={props.handleClose} />
                    </div>
                    <div className="referralusermodal-main">
                        <div className="referralusermodal-image-img">
                            <div className="referralusermodal-image">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div">
                                <h6>User name</h6>
                                <span>:</span>
                                <p>Wade Warren</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>User Type</h6>
                                <span>:</span>
                                <p>Partner</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Status </h6>
                                <span>:</span>
                                <p style={{ color: "#E1B913" }}>Pending</p>
                            </div>
                        </div>
                        <div className="referralusermodal-failed">
                            <h5>Referee Details</h5>
                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div">
                                <h6>Full Name</h6>
                                <span>:</span>
                                <p>Joe Bill</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Phone no.</h6>
                                <span>:</span>
                                <p>9285858697</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>City</h6>
                                <span>:</span>
                                <p>Kolkata</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Hub</h6>
                                <span>:</span>
                                <p>Ravet Sector</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Address</h6>
                                <span>:</span>
                                <p>Address 1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AdminDetailsModal = (props) => {
    const navigate = useNavigate()
    const { data, onHide } = props;
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{data?.user?.fullName} details</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className="referralusermodal-main">
                        <div className="subadmindetails-image-img">
                            <div className="referralusermodal-image">
                                <img src={data?.user?.image || img1} alt="no image" />
                            </div>
                            <div className="subadmindetails-image-content">
                                <h6>Permissions</h6>
                                {data?.user?.permission && data.user.permission.length > 0 ? (
                                    <ul>
                                        {data.user.permission.map((i, index) => (
                                            <li key={index}>{i}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No data available.</p>
                                )}
                            </div>

                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div ">
                                <h6>Name</h6>
                                <span>:</span>
                                <p>{data?.user?.fullName}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Sub admin ID</h6>
                                <span>:</span>
                                <p>#{data?.user?.userId}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Registered Date</h6>
                                <span>:</span>
                                <p>{data?.memberSince}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Added By</h6>
                                <span>:</span>
                                <p>{data?.user?.fullName}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Status </h6>
                                <span>:</span>
                                <p>{data?.user?.status}</p>
                            </div>
                        </div>
                        <div className="referralusermodal-btns">
                            <button onClick={onHide} className="cancel1">Cancel</button>
                            <button onClick={() => navigate(`/subadmin/view/${data?.user?._id}`)} className="done1">View full details</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddFund = (props) => {
    const navigate = useNavigate()
    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>Add amount</h6>
                        <IoMdClose size={25} onClick={props.handleClose} />
                    </div>
                    <div className="addfund-main">
                        <div className="addfund-container">
                            <label htmlFor="">Amount</label>
                            <span>:</span>
                            <input type="text" placeholder="₹" />
                        </div>
                        <div className="addfund-container">
                            <label htmlFor="">Reason</label>
                            <span>:</span>
                            <select name="" id="">
                                <option value="">Reward Bonus</option>
                            </select>
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button onClick={props.handleClose}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddMainCategoryType = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [maincategoryId, setmainCategoryId] = useState(data?.categoryId?._id || null);
    const [maincategoryname, setmainCategoryname] = useState(data?.categoryId?.name || null);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);



    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    // Fetch main categories
    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories!",
        });
    };

    useEffect(() => {
        fetchMainCategories();
    }, []);

    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setmainCategoryId(data?.mainCategoryId?._id || null);
            setmainCategoryname(data?.mainCategoryId?.name || "");
            setStatus(data?.status || false);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setmainCategoryId(null); // Reset to null for consistency
        setmainCategoryname("");
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !maincategoryId || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("mainCategoryId", maincategoryId);
        formData.append("image", image);
        formData.append("status", status);

        await postApi(endPoints.addMaincategoryType, formData, {
            setLoading,
            successMsg: "MainCategory type added successfully!",
            errorMsg: "Failed to add maincategory type!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mainCategoryId", maincategoryId);
        formData.append("status", status);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateMaincategoryType(id), formData, {
            setLoading,
            successMsg: "MainCategory type updated successfully!",
            errorMsg: "Failed to update maincategory type!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Main Category Type" : "Add Main Category Type"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the main-category type name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Main-Category</label>
                            <select
                                value={maincategoryId || ""}
                                onChange={(e) => {
                                    const selectedmainCategory = mainCategoryOptions?.data?.find(
                                        (category) => category._id === e.target.value
                                    );
                                    setmainCategoryId(e.target.value);
                                    setmainCategoryname(selectedmainCategory?.name || "");
                                }}
                            >
                                <option value="">Select main-Category</option>
                                {mainCategoryOptions?.data?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Status</label>
                            <select
                                onChange={(e) => setStatus(e.target.value === "true")}
                                value={status} // Convert boolean to string
                            >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddCategory = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [maincategoryId, setmainCategoryId] = useState(data?.categoryId?._id || null);
    const [maincategoryname, setmainCategoryname] = useState(data?.categoryId?.name || null);
    const [maincategorytypeId, setmainCategoryTypeId] = useState(data?.categoryId?._id || null);
    const [maincategorytypename, setmainCategoryTypename] = useState(data?.categoryId?.name || null);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const [addmaincategorytype, setAddMaincategorytype] = useState(false);

    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [mainCategorytypeOptions, setMainCategoryTypeOptions] = useState([]);



    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    // Fetch main categories
    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories!",
        });
    };

    const fetchMainCategoriesType = useCallback(async () => {
        await getApi(endPoints.getAllmaincategorytypebymaincategory(maincategoryId), {
            setResponse: setMainCategoryTypeOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories type!",
        });
    }, [maincategoryId]);


    useEffect(() => {
        if (maincategoryId) {
            fetchMainCategoriesType();
        }
    }, [maincategoryId, fetchMainCategoriesType]);


    useEffect(() => {
        fetchMainCategories();
    }, []);

    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setmainCategoryId(data?.mainCategoryId?._id || null);
            setmainCategoryname(data?.mainCategoryId?.name || "");
            setmainCategoryTypeId(data?.mainCategoryType?._id || null);
            setmainCategoryTypename(data?.mainCategoryType?.name || "");
            setStatus(data?.status || false);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setmainCategoryId(null);
        setmainCategoryname("");
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !maincategoryId || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("mainCategoryId", maincategoryId);
        if (addmaincategorytype) {
            formData.append("mainCategoryType", maincategorytypeId);
        }
        formData.append("image", image);
        formData.append("status", status);

        await postApi(endPoints.addcategory, formData, {
            setLoading,
            successMsg: "Category added successfully!",
            errorMsg: "Failed to add category!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mainCategoryId", maincategoryId);
        formData.append("status", status);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updatecategory(id), formData, {
            setLoading,
            successMsg: "Category updated successfully!",
            errorMsg: "Failed to update category!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Category " : "Add Category"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Main-Category</label>
                            <select
                                value={maincategoryId || ""}
                                onChange={(e) => {
                                    const selectedmainCategorytype = mainCategoryOptions?.data?.find(
                                        (category) => category._id === e.target.value
                                    );
                                    setmainCategoryId(e.target.value);
                                    setmainCategoryname(selectedmainCategorytype?.name || "");
                                }}
                            >
                                <option value="">Select main-Category</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    mainCategoryOptions?.data?.length === 0 ?
                                        <option value="">No data</option>
                                        :
                                        mainCategoryOptions?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Also Add Main Category Type</label>
                            <select
                                onChange={(e) => setAddMaincategorytype(e.target.value === "true")}
                                value={addmaincategorytype} // Convert boolean to string
                            >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        {addmaincategorytype &&
                            <div className="addcategory-container">
                                <label htmlFor="">Main-Category-Type</label>
                                <select
                                    value={maincategorytypeId || ""}
                                    onChange={(e) => {
                                        const selectedmainCategorytype = mainCategorytypeOptions?.data?.find(
                                            (category) => category._id === e.target.value
                                        );
                                        setmainCategoryTypeId(e.target.value);
                                        setmainCategoryTypename(selectedmainCategorytype?.name || "");
                                    }}
                                >
                                    <option value="">Select main-Category-type</option>
                                    {loading ?
                                        <option value="">Loading...</option>
                                        :
                                        mainCategorytypeOptions?.data?.length === 0 ?
                                            <option value="">No data</option>
                                            :
                                            mainCategorytypeOptions?.data?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                        }
                        <div className="addcategory-container">
                            <label htmlFor="">Status</label>
                            <select
                                onChange={(e) => setStatus(e.target.value === "true")}
                                value={status} // Convert boolean to string
                            >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const AddServicePrice = (props) => {
    const { onHide, id, edit, data, onHide1, fetchData } = props;
    const ids = data?._id;
    const [cityOptions, setCityOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);
    const [city, setCity] = useState(data?.city?._id || '');
    const [cityname, setCityname] = useState(data?.city?.name || '');
    const [sector, setSector] = useState(data?.sector?._id || '');
    const [sectorname, setSectorName] = useState(data?.sector?.name || '');
    const [originalPrice, setOriginalPrice] = useState(data?.originalPrice || '');
    const [discountActive, setDiscountActive] = useState(data?.discountActive || false);
    const [discountPrice, setDiscountPrice] = useState(data?.discountPrice || '');
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (edit && data) {
            setCity(data?.city?._id || '');
            setCityname(data?.city?.name || '');
            setSector(data?.sector?._id || '');
            setSectorName(data?.sector?.name || '');
            setOriginalPrice(data?.originalPrice || '');
            setDiscountActive(data?.discountActive || false);
            setDiscountPrice(data?.discountPrice || '');
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setLocation([]);
        setCity("");
        setCityname("");
        setSector("");
        setSectorName("");
        setOriginalPrice("");
        setDiscountActive(false);
        setDiscountPrice("");
    };


    const fetchCities = async () => {
        await getApi(endPoints.getAllcity, {
            setResponse: setCityOptions,
            setLoading,
            errorMsg: "Failed to fetch cities!",
        });
    };

    const fetchsector = useCallback(async () => {
        if (!city) return;
        await getApi(endPoints.getAllSectorbycityid(city), {
            setResponse: setSectorOptions,
            setLoading,
            errorMsg: "Failed to fetch sectors!",
        });
    }, [city]);

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        fetchsector();
    }, [fetchsector]);


    const handleAddCity = () => {
        if (!city || !sector || !originalPrice) {
            toast.error("Please fill in all the required fields!");
            return;
        }

        const newCity = {
            city,
            sector,
            // cityname,
            originalPrice: Number(originalPrice),
            discountActive,
            discountPrice: discountActive ? Number(discountPrice) : null,
        };

        setLocation([...location, newCity]);
        // Clear the form
        setCity("");
        setSector("");
        setOriginalPrice("");
        setDiscountActive(true);
        setDiscountPrice("");
    };

    const handleRemoveCity = (index) => {
        const updatedLocation = [...location];
        updatedLocation.splice(index, 1);
        setLocation(updatedLocation);
    };

    const handleSubmit = async () => {
        if (location.length === 0) {
            toast.error("Please add at least one city!");
            return;
        }

        const payload = {
            location,
        };

        await putApi(endPoints.addServiceLocation(id), payload, {
            setLoading,
            successMsg: "Price added successfully!",
            errorMsg: "Failed to add price!",
        });

        resetForm();
        onHide();
        fetchData();
    };

    const handleupdate = async () => {
        const payload = {
            city,
            sector,
            // cityname,
            originalPrice: Number(originalPrice),
            discountActive,
            discountPrice: discountActive ? Number(discountPrice) : null,
        };
        await putApi(endPoints.updateserviceLocationandPrice(id, ids), payload, {
            setLoading,
            successMsg: "Price updated successfully!",
            errorMsg: "Failed to update price!",
        });

        resetForm();
        onHide();
        onHide1();
        fetchData();
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>{edit ? "Edit Prices " : "Add Prices"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        {/* Form to add a single city */}
                        <div className="addcategory-container">
                            <label htmlFor="">City</label>
                            <select
                                value={city || ""}
                                onChange={(e) => {
                                    const selectcity = cityOptions?.data?.find(
                                        (city) => city._id === e.target.value
                                    );
                                    setCity(e.target.value);
                                    setCityname(selectcity?.name || "");
                                }}
                            >
                                <option value="">Select City</option>
                                {cityOptions?.data?.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Sector</label>
                            <select
                                value={sector || ""}
                                onChange={(e) => {
                                    const selectsector = sectorOptions?.data?.find(
                                        (city) => city._id === e.target.value
                                    );
                                    setSector(e.target.value);
                                    setSectorName(selectsector?.name || "");
                                }}
                            >
                                <option value="">Select Sector</option>
                                {sectorOptions?.data?.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Original Price</label>
                            <input
                                type="number"
                                placeholder="Enter original price"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Discount Active</label>
                            <select
                                value={discountActive}
                                onChange={(e) => setDiscountActive(e.target.value === "true")}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        {discountActive && (
                            <div className="addcategory-container">
                                <label htmlFor="">Discount Price</label>
                                <input
                                    type="number"
                                    placeholder="Enter discount price"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                />
                            </div>
                        )}
                        {!edit &&
                            <div className='userlist5'>
                                <button onClick={handleAddCity}>
                                    Add
                                </button>
                            </div>
                        }

                        {/* Display the list of added cities */}
                        <div className="city-list-container">
                            {location.map((item, index) => (
                                <div key={index} className="city-list-item">
                                    <p>
                                        <strong>City:</strong> {cityname}
                                    </p>
                                    <p>
                                        <strong>Sector:</strong> {sectorname}
                                    </p>
                                    <p>
                                        <strong>Original Price:</strong> {item.originalPrice}
                                    </p>
                                    <p>
                                        <strong>Discount Active:</strong> {item.discountActive ? "Yes" : "No"}
                                    </p>
                                    {item.discountActive && (
                                        <p>
                                            <strong>Discount Price:</strong> {item.discountPrice}
                                        </p>
                                    )}
                                    <div className='userlist5'>
                                        <button onClick={() => handleRemoveCity(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Final submit button */}
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
const ViewSevicePrice = (props) => {
    const { onHide, location, openEditModal } = props;


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>All Location prices ({location?.length})</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>City Name</th>
                                    <th>Sector Name</th>
                                    <th>Original Price</th>
                                    <th>Discount</th>
                                    <th>Discount Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {location?.services?.length === 0 ?
                                    <tr>
                                        <td colSpan="10" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                    :
                                    location?.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order?.city?.name || "N/A"}</td>
                                            <td>{order?.sector?.name || "N/A"}</td>
                                            <td>{order?.originalPrice || "N/A"}</td>
                                            <td>{order?.discount || "N/A"}%</td>
                                            <td>{order.discountPrice || 0}</td>
                                            <td className='div-icons'>
                                                <FaEdit
                                                    onClick={() => openEditModal(order)}  // Open AddPrice in edit mode
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}



const AddServiceImage = (props) => {
    const { onHide, id, fetchdata } = props;
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter((file) =>
            file.type.startsWith("image/")
        );

        if (validFiles.length === 0) {
            toast.error("Please select valid image files!");
            return;
        }

        setImage((prev) => [...prev, ...validFiles]);
    };

    const handleRemoveImage = (index) => {
        setImage((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (image.length === 0) {
            toast.error("Please add at least one image!");
            return;
        }

        const formData = new FormData();
        image.forEach((image) => {
            formData.append("image", image);
        });

        await putApi(endPoints.updateserviceimg(id), formData, {
            setLoading,
            successMsg: "Images added successfully!",
            errorMsg: "Failed to add images!",
            headers: { "Content-Type": "multipart/form-data" },
        });
        fetchdata();
        resetForm();
        onHide();
    };

    // Reset form
    const resetForm = () => {
        setImage([]);
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>Add Images</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="fileInput">Select Images</label>
                            <input
                                type="file"
                                id="fileInput"
                                multiple
                                accept="image/*"
                                onChange={handleAddImage}
                            />
                        </div>

                        {/* Display the list of added images */}
                        <div className="image-list-container">
                            {image.map((image, index) => (
                                <div key={index} className="image-list-item">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Image ${index + 1}`}
                                        className="image-preview"
                                    />
                                    <div className="addserivce-btn">
                                        <button onClick={() => handleRemoveImage(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit button */}
                        <div className="userlist5">
                            <button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


const AddSlot = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [maincategoryId, setMainCategoryId] = useState(data?.categoryId?._id || null);
    const [maincategoryname, setMainCategoryName] = useState(data?.categoryId?.name || null);
    const [datefrom, setDateFrom] = useState(data?.dateFrom || null);
    const [dateto, setDateTo] = useState(data?.dateTo || null);
    const [timeto, setTimeTo] = useState(data?.timeFrom || null);
    const [timefrom, setTimeFrom] = useState(data?.timeTo || null);
    const [duration, setDuration] = useState(data?.selectDuration || null);
    const [loading, setLoading] = useState(false);


    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);


    // Fetch main categories
    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories!",
        });
    };

    useEffect(() => {
        fetchMainCategories();
    }, []);


    useEffect(() => {
        if (edit && data) {
            setMainCategoryId(data?.mainCategoryId?._id || null);
            setMainCategoryName(data?.mainCategoryId?.name || "");
            setDateFrom(data?.dateFrom || "");
            setDateTo(data?.dateTo || "");
            setTimeFrom(data?.timeFrom || "");
            setTimeTo(data?.timeTo || "");
            setDuration(data?.selectDuration || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setMainCategoryId(null);
        setMainCategoryName("");
        setDateFrom("");
        setDateTo("");
        setTimeFrom("");
        setTimeTo("");
        setDuration("");
    };





    const handleSubmit = async () => {

        const payload = {
            mainCategory: maincategoryId,
            dateFrom: datefrom,
            dateTo: dateto,
            timeFrom: timefrom,
            timeTo: timeto,
            selectDuration: duration,
            jobAcceptance: 15,
        };

        await postApi(endPoints.addSlot, payload, {
            setLoading,
            successMsg: "Slot added successfully!",
            errorMsg: "Failed to add slot!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            mainCategory: maincategoryId,
            dateFrom: datefrom,
            dateTo: dateto,
            timeFrom: timefrom,
            timeTo: timeto,
            selectDuration: duration,
            jobAcceptance: 15,
        };


        await putApi(endPoints.updateSlot(id), payload, {
            setLoading,
            successMsg: "Slot updated successfully!",
            errorMsg: "Failed to update slot!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Slot " : "Add Slot"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Main-Category</label>
                            <select
                                value={maincategoryId || ""}
                                onChange={(e) => {
                                    const selectedCategory = mainCategoryOptions?.data?.find(
                                        (category) => category._id === e.target.value
                                    );
                                    setMainCategoryId(e.target.value);
                                    setMainCategoryName(selectedCategory?.name || "");
                                }}
                            >
                                <option value="">Select main-Category</option>
                                {mainCategoryOptions?.data?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Date From</label>
                            <input type="date" value={datefrom} onChange={(e) => setDateFrom(e.target.value)} />
                            {datefrom &&
                                <p style={{ margin: "0" }}>selected Date:{formatDate(datefrom)} </p>
                            }
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Date To</label>
                            <input type="date" value={dateto} onChange={(e) => setDateTo(e.target.value)} />
                            {dateto &&
                                <p>selected Date:{formatDate(dateto)} </p>
                            }
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Time From</label>
                            <input type="time" value={timefrom} onChange={(e) => setTimeFrom(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Time To</label>
                            <input type="time" value={timeto} onChange={(e) => setTimeTo(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label>Duration</label>
                            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddPassFail = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [status, setStatus] = useState(data?.status || '');
    const [skillSessionResult, setSkillSessionResult] = useState(data?.skillSessionResult || '');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (edit && data) {
            setStatus(data?.status || "");
            setSkillSessionResult(data?.skillSessionResult || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setStatus("");
        setSkillSessionResult("");
    };







    const handleupdate = async () => {
        const payload = {
            status: status,
            skillSessionResult: skillSessionResult,
        };


        await putApi(endPoints.updateSkillresult(id), payload, {
            setLoading,
            successMsg: "Status updated successfully!",
            errorMsg: "Failed to update status!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Skill Session Result " : "Add Slot"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Skill Session Result</label>
                            <select value={skillSessionResult} onChange={(e) => setSkillSessionResult(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={handleupdate}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddCity = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [cityname, setCityName] = useState(data?.name || "");
    const [Status, setStatus] = useState(data?.status || '');
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (edit && data) {
            setCityName(data?.name || "");
            setStatus(data?.status || '');
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setCityName("");
        setStatus('');
    };





    const handleSubmit = async () => {

        const payload = {
            name: cityname,
            status: Status,
        };

        await postApi(endPoints.addcity, payload, {
            setLoading,
            successMsg: "City added successfully!",
            errorMsg: "Failed to add city!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            name: cityname,
            status: Status,
        };

        await putApi(endPoints.updatecity(id), payload, {
            setLoading,
            successMsg: "City updated successfully!",
            errorMsg: "Failed to update city!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit City " : "Add City"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">City Name</label>
                            <input type="text" value={cityname} onChange={(e) => setCityName(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label>Status</label>
                            <select value={Status} onChange={(e) => setStatus(e.target.value === "true")}>
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddArea = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [areaname, setAreaName] = useState(data?.name || "");
    const [cityname, setCityName] = useState(data?.city?.name || "");
    const [cityid, setCityId] = useState(data?.city?.name || "");
    const [Status, setStatus] = useState(data?.status || '');
    const [loading, setLoading] = useState(false);

    const [cityoptions, setCityOptions] = useState([]);


    const fetchCity = async () => {
        await getApi(endPoints.getcity, {
            setResponse: setCityOptions,
            setLoading,
            errorMsg: "Failed to fetch data!",
        });
    };

    useEffect(() => {
        fetchCity();
    }, []);

    useEffect(() => {
        if (edit && data) {
            setAreaName(data?.name || "");
            setCityName(data?.city?.name || "");
            setStatus(data?.status || '');
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setCityName("");
        setAreaName("");
        setStatus('');
    };





    const handleSubmit = async () => {

        const payload = {
            cityId: cityid,
            name: areaname,
            status: Status,
        };

        await postApi(endPoints.addarea, payload, {
            setLoading,
            successMsg: "Area added successfully!",
            errorMsg: "Failed to add area!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {

        const payload = {
            cityId: cityid,
            name: areaname,
            status: Status,
        };

        await putApi(endPoints.updatearea(id), payload, {
            setLoading,
            successMsg: "Area updated successfully!",
            errorMsg: "Failed to update area!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Area " : "Add Area"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Area Name</label>
                            <input type="text" value={areaname} onChange={(e) => setAreaName(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Select City</label>
                            <select
                                value={cityid || ""}
                                onChange={(e) => {
                                    const selectcity = cityoptions?.data?.find(
                                        (city) => city._id === e.target.value
                                    );
                                    setCityId(e.target.value);
                                    setCityName(selectcity?.name || "");
                                }}
                            >
                                <option value="">Select City</option>
                                {cityoptions?.data?.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Status</label>
                            <select value={Status} onChange={(e) => setStatus(e.target.value === "true")}>
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddCharges = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [charge, setCharge] = useState(data?.charge || '');
    const [discountCharge, setDiscountCharge] = useState(data?.discountCharge || '');
    const [cancelation, setCancelation] = useState(data?.cancelation || '');
    const [discount, setDiscount] = useState(data?.discount || '');
    const [imagePreview, setImagePreview] = useState(data?.image || null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);



    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];



    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setCharge(data?.charge || "");
            setDiscountCharge(data?.discountCharge || "");
            setCancelation(data?.cancelation || false);
            setDiscount(data?.discount || false);
            setStatus(data?.status || false);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setCharge(null);
        setDiscountCharge("");
        setCancelation("");
        setDiscount("");
        setStatus("");
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !charge || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("charge", charge);
        formData.append("discountCharge", Number(discountCharge));
        formData.append("cancelation", Boolean(cancelation));
        formData.append("discount", Boolean(discount));
        formData.append("image", image);
        formData.append("status", Boolean(status));

        await postApi(endPoints.addCharge, formData, {
            setLoading,
            successMsg: "Charges added successfully!",
            errorMsg: "Failed to add charges!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            name,
            charge,
            discountCharge: Number(discountCharge),
            cancelation: Boolean(cancelation),
            discount: Boolean(discount),
            status: Boolean(status),
        };
        await putApi(endPoints.updatecharges(id), payload, {
            setLoading,
            successMsg: "Charges updated successfully!",
            errorMsg: "Failed to update Charges!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Charges " : "Add Charges"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Charges Name</label>
                            <input
                                type="text"
                                placeholder="Enter the charges name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Charges Amount</label>
                            <input
                                type="number"
                                placeholder="Enter the charges amount"
                                value={charge}
                                onChange={(e) => setCharge(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Is Discount</label>
                            <select value={discount} onChange={(e) => setDiscount(e.target.value === "true")}>
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        {discount &&
                            <div className="addcategory-container">
                                <label htmlFor="">Discount Charge Amount</label>
                                <input
                                    type="number"
                                    placeholder="Enter the discount charges amount"
                                    value={discountCharge}
                                    onChange={(e) => setDiscountCharge(e.target.value)}
                                />
                            </div>
                        }
                        <div className="addcategory-container">
                            <label htmlFor="">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value === "true")}>
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        {!edit &&
                            <div className="addcategory-container">
                                <label htmlFor="">Image</label>
                                <div className='addservice-right-image'>
                                    {imagePreview
                                        ?
                                        <>
                                            <div className="image-preview-container">
                                                <img src={imagePreview} alt="Preview" />
                                            </div>
                                            <div className='addserivce-btn'>
                                                <button onClick={handleClearImage}>Clear</button>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <FiUpload color='#979797' size={25} />
                                            <p>Upload CSV File or image</p>
                                            <div className='addserivce-btn'>
                                                <button onClick={handleUploadClick}>Upload</button>
                                            </div>
                                        </>
                                    }
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </div>
                        }

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddTraningVideos = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [videolink, setVideoLink] = useState(data?.link || '');
    const [description, setDescription] = useState(data?.description || '');
    const [date, setDate] = useState(data?.date || '');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (edit && data) {
            setVideoLink(data?.link || "");
            setDescription(data?.description || "");
            setDate(data?.date || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setVideoLink(null);
        setDescription("");
        setDate("");
    };





    const handleSubmit = async () => {

        const payload = {
            link: videolink,
            description: description,
            date: date,
        };

        await postApi(endPoints.addTraningvideo, payload, {
            setLoading,
            successMsg: "Traning Video added successfully!",
            errorMsg: "Failed to add traning video!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            link: videolink,
            description: description,
            date: date,
        };


        await postApi(endPoints.updatetraningvideos(id), payload, {
            setLoading,
            successMsg: "Traning Video updated successfully!",
            errorMsg: "Failed to update traning video!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Traning Video" : "Add Traning Video"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Video Link</label>
                            <input type="text" value={videolink} onChange={(e) => setVideoLink(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="addcategory-container">
                            <label>Duration</label>
                            <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddTestimonial = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [maincategoryId, setmainCategoryId] = useState(data?.mainCategoryId || null);
    const [maincategoryname, setmainCategoryname] = useState(data?.mainCategoryId?.name || null);
    const [description, setDescription] = useState(data?.description || null);
    const [imagePreview, setImagePreview] = useState(data?.image || null);
    const [image, setImage] = useState(data?.image || null);
    const [loading, setLoading] = useState(false);


    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);



    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    // Fetch main categories
    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            errorMsg: "Failed to fetch main categories!",
        });
    };

    useEffect(() => {
        fetchMainCategories();
    }, []);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setmainCategoryId(data?.mainCategoryId || null);
            setmainCategoryname(data?.mainCategoryId || "");
            setDescription(data?.description || "");
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
        setmainCategoryId(null);
        setmainCategoryname("");
        setDescription("");
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!title || !maincategoryId || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("mainCategoryId", maincategoryId);
        formData.append("description", description);
        formData.append("image", image);

        await postApi(endPoints.addTestimonial, formData, {
            setLoading,
            successMsg: "Testimonial added successfully!",
            errorMsg: "Failed to add testimonial!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("mainCategoryId", maincategoryId);
        formData.append("description", description);
        formData.append("image", image);

        await putApi(endPoints.updatetestimonial(id), formData, {
            setLoading,
            successMsg: "Testimonial updated successfully!",
            errorMsg: "Failed to update testimonial!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Testimonial " : "Add Testimonial"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Title</label>
                            <input
                                type="text"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Main-Category</label>
                            <select
                                value={maincategoryId || ""}
                                onChange={(e) => {
                                    const selectedmainCategorytype = mainCategoryOptions?.data?.find(
                                        (category) => category._id === e.target.value
                                    );
                                    setmainCategoryId(e.target.value);
                                    setmainCategoryname(selectedmainCategorytype?.name || "");
                                }}
                            >
                                <option value="">Select main-Category</option>
                                {mainCategoryOptions?.data?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Description</label>
                            <textarea
                                placeholder="Enter the description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddInsurance = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [planName, setPlanName] = useState(data?.planName || '');
    const [coverAmount, setCoverAmount] = useState(data?.coverAmount || '');
    const [monthlyPremium, setMonthlyPremium] = useState(data?.premium?.monthlyPremium || '');
    const [annualPremium, setAnnualPremium] = useState(data?.premium?.annualPremium || '');
    const [description, setDescription] = useState(data?.description || '');
    const [coverageDetails, setCoverageDetails] = useState(data?.coverageDetails || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (edit && data) {
            setPlanName(data?.planName || "");
            setCoverAmount(data?.coverAmount || "");
            setMonthlyPremium(data?.premium?.monthlyPremium || "");
            setAnnualPremium(data?.premium?.annualPremium || "");
            setDescription(data?.description || "");
            setCoverageDetails(data?.coverageDetails || []);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setPlanName("");
        setCoverAmount("");
        setMonthlyPremium("");
        setAnnualPremium("");
        setDescription("");
        setCoverageDetails([]);
    };

    const handleCoverageChange = (index, key, value) => {
        setCoverageDetails(prevCoverage => {
            const updatedCoverage = [...prevCoverage];
            updatedCoverage[index] = { ...updatedCoverage[index], [key]: value };
            return updatedCoverage;
        });
    };


    const addCoverageDetail = () => {
        setCoverageDetails([...coverageDetails, { coverageType: "", isCovered: false }]);
    };

    const removeCoverageDetail = (index) => {
        const updatedCoverage = coverageDetails.filter((_, i) => i !== index);
        setCoverageDetails(updatedCoverage);
    };

    const handleSubmit = async () => {
        if (!planName || !coverAmount || !monthlyPremium) {
            toast.error("Please provide all the fields!");
            return;
        }

        const requestBody = {
            planName,
            coverAmount,
            monthlyPremium,
            annualPremium,
            description,
            coverageDetails,
        };

        await postApi(endPoints.addInsurance, requestBody, {
            setLoading,
            successMsg: "Insurance plan added successfully!",
            errorMsg: "Failed to add insurance plan!",
        });

        fetchdata();
        onHide();
        resetForm();
    };

    const handleUpdate = async () => {
        if (!id) {
            toast.error("Invalid insurance ID!");
            return;
        }

        const requestBody = {
            planName,
            coverAmount,
            monthlyPremium,
            annualPremium,
            description,
            coverageDetails,
        };

        await putApi(endPoints.updateInsurance(id), requestBody, {
            setLoading,
            successMsg: "Insurance plan updated successfully!",
            errorMsg: "Failed to update insurance plan!",
        });

        fetchdata();
        onHide();
        resetForm();
    };


    return (
        <Modal {...props} size="lg" centered>
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Insurance Plans " : "Add Insurance Plans"}</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Plan Name</label>
                            <input
                                type="text"
                                placeholder="Enter the name"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Cover Amount</label>
                            <input
                                type="text"
                                placeholder="Enter the cover amount"
                                value={coverAmount}
                                onChange={(e) => setCoverAmount(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Monthly Premium</label>
                            <input
                                type="text"
                                placeholder="Enter the monthly premium"
                                value={monthlyPremium}
                                onChange={(e) => setMonthlyPremium(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Annual Premium</label>
                            <input
                                type="text"
                                placeholder="Enter the annual premium"
                                value={annualPremium}
                                onChange={(e) => setAnnualPremium(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Description</label>
                            <textarea
                                placeholder="Enter the description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Coverage Details</label>
                            {coverageDetails.map((item, index) => (
                                <div key={index} className="coverage-item">
                                    <input type="text" placeholder="Coverage Type" value={item.coverageType} onChange={(e) => handleCoverageChange(index, 'coverageType', e.target.value)} />
                                    <label htmlFor="" style={{ marginTop: "0.5rem" }}>Is Covered</label>
                                    <select
                                        value={item.isCovered ? "true" : "false"}
                                        onChange={(e) => handleCoverageChange(index, 'isCovered', e.target.value === "true")}
                                    >

                                        <option value="">Select</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                    <div className='userlist5' style={{ marginTop: "0.5rem" }}>
                                        <button onClick={() => removeCoverageDetail(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className='userlist5'>
                                <button onClick={addCoverageDetail}>Add Coverage Detail</button>
                            </div>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleUpdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


const AddPackagePrice = (props) => {
    const { onHide, id, edit, data, onHide1, fetchData } = props;
    const ids = data?._id;
    const [cityOptions, setCityOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);
    const [city, setCity] = useState(data?.city?._id || '');
    const [cityname, setCityname] = useState(data?.city?.name || '');
    const [sector, setSector] = useState(data?.sector?._id || '');
    const [sectorname, setSectorName] = useState(data?.sector?.name || '');
    const [originalPrice, setOriginalPrice] = useState(data?.originalPrice || '');
    const [discountActive, setDiscountActive] = useState(data?.discountActive || false);
    const [discountPrice, setDiscountPrice] = useState(data?.discountPrice || '');
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (edit && data) {
            setCity(data?.city?._id || '');
            setCityname(data?.city?.name || '');
            setSector(data?.sector?._id || '');
            setSectorName(data?.sector?.name || '');
            setOriginalPrice(data?.originalPrice || '');
            setDiscountActive(data?.discountActive || false);
            setDiscountPrice(data?.discountPrice || '');
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setLocation([]);
        setCity("");
        setCityname("");
        setSector("");
        setSectorName("");
        setOriginalPrice("");
        setDiscountActive(false);
        setDiscountPrice("");
    };


    const fetchCities = async () => {
        await getApi(endPoints.getAllcity, {
            setResponse: setCityOptions,
            setLoading,
            errorMsg: "Failed to fetch cities!",
        });
    };

    const fetchsector = useCallback(async () => {
        if (!city) return;
        await getApi(endPoints.getAllSectorbycityid(city), {
            setResponse: setSectorOptions,
            setLoading,
            errorMsg: "Failed to fetch sectors!",
        });
    }, [city]);

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        fetchsector();
    }, [fetchsector]);


    const handleAddCity = () => {
        if (!city || !sector || !originalPrice) {
            toast.error("Please fill in all the required fields!");
            return;
        }

        const newCity = {
            city,
            sector,
            // cityname,
            originalPrice: Number(originalPrice),
            discountActive,
            discountPrice: discountActive ? Number(discountPrice) : null,
        };

        setLocation([...location, newCity]);
        // Clear the form
        setCity("");
        setSector("");
        setOriginalPrice("");
        setDiscountActive(true);
        setDiscountPrice("");
    };

    const handleRemoveCity = (index) => {
        const updatedLocation = [...location];
        updatedLocation.splice(index, 1);
        setLocation(updatedLocation);
    };

    const handleSubmit = async () => {
        if (location.length === 0) {
            toast.error("Please add at least one city!");
            return;
        }

        const payload = {
            location,
        };

        await putApi(endPoints.addPackageLocationandPrice(id), payload, {
            setLoading,
            successMsg: "Price added successfully!",
            errorMsg: "Failed to add price!",
        });

        resetForm();
        onHide();
        fetchData();
    };

    const handleupdate = async () => {
        const payload = {
            city,
            sector,
            // cityname,
            originalPrice: Number(originalPrice),
            discountActive,
            discountPrice: discountActive ? Number(discountPrice) : null,
        };
        await putApi(endPoints.updatePackageLocationandPrice(id, ids), payload, {
            setLoading,
            successMsg: "Price updated successfully!",
            errorMsg: "Failed to update price!",
        });

        resetForm();
        onHide();
        onHide1();
        fetchData();
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>{edit ? "Edit Prices " : "Add Prices"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        {/* Form to add a single city */}
                        <div className="addcategory-container">
                            <label htmlFor="">City</label>
                            <select
                                value={city || ""}
                                onChange={(e) => {
                                    const selectcity = cityOptions?.data?.find(
                                        (city) => city._id === e.target.value
                                    );
                                    setCity(e.target.value);
                                    setCityname(selectcity?.name || "");
                                }}
                            >
                                <option value="">Select City</option>
                                {cityOptions?.data?.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Sector</label>
                            <select
                                value={sector || ""}
                                onChange={(e) => {
                                    const selectsector = sectorOptions?.data?.find(
                                        (city) => city._id === e.target.value
                                    );
                                    setSector(e.target.value);
                                    setSectorName(selectsector?.name || "");
                                }}
                            >
                                <option value="">Select Sector</option>
                                {sectorOptions?.data?.map((city) => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Original Price</label>
                            <input
                                type="number"
                                placeholder="Enter original price"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Discount Active</label>
                            <select
                                value={discountActive}
                                onChange={(e) => setDiscountActive(e.target.value === "true")}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        {discountActive && (
                            <div className="addcategory-container">
                                <label htmlFor="">Discount Price</label>
                                <input
                                    type="number"
                                    placeholder="Enter discount price"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                />
                            </div>
                        )}
                        {!edit &&
                            <div className='userlist5'>
                                <button onClick={handleAddCity}>
                                    Add
                                </button>
                            </div>
                        }

                        {/* Display the list of added cities */}
                        <div className="city-list-container">
                            {location.map((item, index) => (
                                <div key={index} className="city-list-item">
                                    <p>
                                        <strong>City:</strong> {cityname}
                                    </p>
                                    <p>
                                        <strong>Sector:</strong> {sectorname}
                                    </p>
                                    <p>
                                        <strong>Original Price:</strong> {item.originalPrice}
                                    </p>
                                    <p>
                                        <strong>Discount Active:</strong> {item.discountActive ? "Yes" : "No"}
                                    </p>
                                    {item.discountActive && (
                                        <p>
                                            <strong>Discount Price:</strong> {item.discountPrice}
                                        </p>
                                    )}
                                    <div className='userlist5'>
                                        <button onClick={() => handleRemoveCity(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Final submit button */}
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const ViewPackagePrice = (props) => {
    const { onHide, location, openEditModal } = props;


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>All Location prices ({location?.length})</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>City Name</th>
                                    <th>Sector Name</th>
                                    <th>Original Price</th>
                                    <th>Discount</th>
                                    <th>Discount Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {location?.services?.length === 0 ?
                                    <tr>
                                        <td colSpan="10" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                    :
                                    location?.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order?.city?.name || "N/A"}</td>
                                            <td>{order?.sector?.name || "N/A"}</td>
                                            <td>{order?.originalPrice || "N/A"}</td>
                                            <td>{order?.discount || "N/A"}%</td>
                                            <td>{order.discountPrice || 0}</td>
                                            <td className='div-icons'>
                                                <FaEdit
                                                    onClick={() => openEditModal(order)}  // Open AddPrice in edit mode
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const AddPackageImage = (props) => {
    const { onHide, id, fetchdata } = props;
    const [image, setImage] = useState([]); // Array to store selected image files
    const [loading, setLoading] = useState(false);

    // Handle adding new image files
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files); // Get selected files as an array
        const validFiles = files.filter((file) =>
            file.type.startsWith("image/") // Only accept image files
        );

        if (validFiles.length === 0) {
            toast.error("Please select valid image files!");
            return;
        }

        setImage((prev) => [...prev, ...validFiles]);
    };

    // Remove an image from the list
    const handleRemoveImage = (index) => {
        setImage((prev) => prev.filter((_, i) => i !== index));
    };

    // Submit all images
    const handleSubmit = async () => {
        if (image.length === 0) {
            toast.error("Please add at least one image!");
            return;
        }

        const formData = new FormData();
        image.forEach((image) => {
            formData.append("image", image); // Append each image file to FormData
        });

        await putApi(endPoints.updatepackageimg(id), formData, {
            setLoading,
            successMsg: "Images added successfully!",
            errorMsg: "Failed to add images!",
            headers: { "Content-Type": "multipart/form-data" },
        });
        fetchdata();
        resetForm();
        onHide();
    };

    // Reset form
    const resetForm = () => {
        setImage([]);
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>Add Images</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        {/* Input to add image files */}
                        <div className="addcategory-container">
                            <label htmlFor="fileInput">Select Images</label>
                            <input
                                type="file"
                                id="fileInput"
                                multiple
                                accept="image/*"
                                onChange={handleAddImage}
                            />
                        </div>

                        {/* Display the list of added images */}
                        <div className="image-list-container">
                            {image.map((image, index) => (
                                <div key={index} className="image-list-item">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Image ${index + 1}`}
                                        className="image-preview"
                                    />
                                    <div className="addserivce-btn">
                                        <button onClick={() => handleRemoveImage(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit button */}
                        <div className="userlist5">
                            <button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


const PayoutModal = (props) => {
    const { data, fetchdata, onHide } = props;
    const id = data?._id;
    const [ispayoutamountsend, setisPayoutAmountSend] = useState(data?.isPayoutAmountSend || null);
    const [payoutAmountSendTransctionId, setpayoutAmountSendTransctionId] = useState(data?.payoutAmountSendTransctionId || '');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (data) {
            setisPayoutAmountSend(data?.isPayoutAmountSend || null);
            setpayoutAmountSendTransctionId(data?.payoutAmountSendTransctionId || '');
        }
    }, [data]);

    const resetForm = () => {
        setisPayoutAmountSend("");
        setpayoutAmountSendTransctionId(null);
    };



    const handleSubmit = async () => {
        if (!ispayoutamountsend || !payoutAmountSendTransctionId) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            isPayoutAmountSend: ispayoutamountsend,
            payoutAmountSendTransctionId: payoutAmountSendTransctionId
        }

        await putApi(endPoints.updatePayoutStatus(id), payload, {
            setLoading,
            successMsg: "Payment Status Updated successfully!",
            errorMsg: "Failed to update payment status!",
        });
        fetchdata();
        onHide();
        resetForm();
    };



    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>View/Edit Payout Status</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Is Payment Done</label>
                            <select
                                onChange={(e) => setisPayoutAmountSend(e.target.value === "true")}
                                value={ispayoutamountsend}
                            >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Transaction Id</label>
                            <input
                                type="text"
                                placeholder="Enter the transaction id"
                                value={payoutAmountSendTransctionId}
                                onChange={(e) => setpayoutAmountSendTransctionId(e.target.value)}
                            />
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Updating" : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddReFund = (props) => {
    const { data, fetchdata, onHide } = props;
    const id = data?._id;
    const [refundamount, setRefundAmount] = useState(data?.refundAmount || '');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (data) {
            setRefundAmount(data?.refundAmount || '');
        }
    }, [data]);

    const resetForm = () => {
        setRefundAmount("");
    };



    const handleSubmit = async () => {
        if (!refundamount) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            refundAmount: refundamount,
            isRefundAmount: true
        }

        await putApi(endPoints.updateRefund(id), payload, {
            setLoading,
            successMsg: "Refund send successfully!",
            errorMsg: "Failed to sent Refund!",
        });
        fetchdata();
        onHide();
        resetForm();
    };



    const closing = () => {
        resetForm();
        onHide();
    };
    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>Send Refund</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addfund-container">
                            <label htmlFor="">Refund Amount</label>
                            <span>:</span>
                            <input type="text" placeholder="₹"
                                value={refundamount}
                                onChange={(e) => setRefundAmount(e.target.value)}
                            />
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Sending" : "Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const AssignPartnerModal = (props) => {
    const { show, onHide, orderId, fetchData } = props;
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });
    // Fetch available partners

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const fetchPartners = useCallback(async () => {
        setPartners([]);
        await getApi(endPoints.getallPartner(pagination.page, pagination.limit, debouncedSearchQuery), {
            setResponse: setPartners,
            setLoading: setLoading,
            errorMsg: "Failed to fetch partner data!",
        })
    }, [pagination.page, pagination.limit, debouncedSearchQuery]);

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            totalPages: partners?.pagination?.totalPages || 1,
            hasPrevPage: partners?.pagination?.hasPrevPage || false,
            hasNextPage: partners?.pagination?.hasNextPage || false,
        }));
    }, [partners]);

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };


    useEffect(() => {
        if (show) {
            fetchPartners();
        }
    }, [show, fetchPartners]);

    const handleAssignPartner = async () => {
        if (!selectedPartner) {
            toast.error("Please select a partner");
            return;
        }
        await putApi(endPoints.assignPartnerToService(selectedPartner, orderId), null, {
            setLoading: setIsSubmitting,
            successMsg: "Partner assigned successfully!",
            errorMsg: "Failed to assign partner!",
        });
        fetchData();
        onHide();
        setSelectedPartner('')
        setSearchQuery('')
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='partner-assignment-modal'>
                    <div className="referralusermodal-header">
                        <h6>Assign Partner to Order</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>

                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="search">Search Partners</label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Partner Selection */}
                        <div className="addcategory-container">
                            <label htmlFor="partner-select">Select Partner</label>
                            <select
                                id="partner-select"
                                value={selectedPartner}
                                onChange={(e) => setSelectedPartner(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">-- Select Partner --</option>
                                {loading ? (
                                    <option value="">Loading partners...</option>
                                ) : partners?.data?.length > 0 ? (
                                    partners.data.map(partner => (
                                        <option key={partner._id} value={partner._id}>
                                            {partner?.user?.fullName?.trim() ||
                                                `${partner?.user?.firstName || ''} ${partner?.user?.lastName || ''}`.trim() ||
                                                'N/A'} ({partner?.user?.email})
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No partners found</option>
                                )}
                            </select>
                        </div>

                        {/* Pagination Controls */}
                        {partners?.data?.length > 0 && (
                            <div className="pagination-controls">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={!pagination.hasPrevPage || loading}
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={!pagination.hasNextPage || loading}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAssignPartner}
                                    disabled={isSubmitting || !selectedPartner}
                                >
                                    {isSubmitting ? 'Assigning...' : 'Assign Partner'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
};



export {
    DetailsReferral,
    DetailsReferralPending,
    DetailsReferralFailed,
    AdminDetailsModal,
    AddFund,
    AddMainCategoryType,
    AddCategory,
    ViewDescription,
    AddServicePrice,
    AddServiceImage,
    AddSlot,
    AddPassFail,
    AddCity,
    AddArea,
    AddCharges,
    AddTraningVideos,
    AddTestimonial,
    AddInsurance,
    CalendarView,
    AddPackagePrice,
    AddPackageImage,
    PayoutModal,
    AddReFund,
    ViewPackagePrice,
    ViewSevicePrice,
    DeleteConfirmation,
    AssignPartnerModal,
    LogoutConfirmation
}