import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { AddCategory, AddMainCategoryType } from '../../components/Modals/Modals';


import { LiaArrowLeftSolid } from "react-icons/lia";
import { MdMoreVert } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


import img from '../../assest/loading1.gif'





const ServiceDetails = () => {
    const { id } = useParams()
    const { service } = useParams()
    const [categoryData, setCategoryData] = useState({});
    const [maincategorytypeData, setMainCategoryTypeData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal1, setShowModal1] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getcategorybymaincategoryid(id), {
            setResponse: setCategoryData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch category data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const fetchMaincategorytypeData = useCallback(async () => {
        await getApi(endPoints.getmaincategorytypebymaincategoryid(id), {
            setResponse: setMainCategoryTypeData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch main category type data!",
        })
    }, [id]);

    useEffect(() => {
        fetchMaincategorytypeData();
    }, [fetchMaincategorytypeData, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const orders = [
        {
            id: "123456",
            name: "Wade Warren",
            email: "abc@gmail.com",
            number: "+91 23456789",
            city: "Delhi",
            jobscompleted: "20",
            jobscancelled: "12",
        },
        {
            id: "234567890",
            name: "Wade Warren",
            email: "abc@gmail.com",
            number: "+91 23456789",
            city: "Delhi",
            jobscompleted: "20",
            jobscancelled: "12",
        },
        {
            id: "345678901",
            name: "Wade Warren",
            email: "abc@gmail.com",
            number: "+91 23456789",
            city: "Delhi",
            jobscompleted: "20",
            jobscancelled: "12",
        },
        {
            id: "456789012",
            name: "Wade Warren",
            email: "abc@gmail.com",
            number: "+91 23456789",
            city: "Delhi",
            jobscompleted: "20",
            jobscancelled: "12",
        },
    ];

    const navigate = useNavigate()



    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };


    const handleDelete = async (Id) => {
        await deleteApi(endPoints.deletecategory(Id), {
            successMsg: "Category deleted successfully!",
            errorMsg: "Failed to delete category!",
            additionalFunctions: [fetchData], 
        });
    };

    const handleDeletemain = async (Id) => {
        await deleteApi(endPoints.deletemaincategorytype(Id), {
            successMsg: "Main Category type deleted successfully!",
            errorMsg: "Failed to delete main category type!",
            additionalFunctions: [fetchData],
        });
    };



    const openEditModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const openEditModal1 = (item) => {
        setSelectedItem(item);
        setShowModal1(true);
    };


    return (
        <>
            <AddCategory
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={true}
            />
            <AddMainCategoryType
                show={showModal1}
                onHide={() => setShowModal1(false)}
                fetchdata={fetchMaincategorytypeData}
                data={selectedItem}
                edit={true}
            />
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>{service}</h6>
                    </div>
                </div>
                <div className='service-details-container'>
                    <div className='service-details-categories'>
                        <label htmlFor="">Main-Categories Type</label>
                        {loading ? (
                            <div className='normalloading'>
                                <img src={img} alt="" />
                            </div>
                        ) : maincategorytypeData?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            <div className='service-details-category'>
                                <Slider {...settings}>
                                    {maincategorytypeData?.data?.map((category, index) => (
                                        <div className="service-details-div" key={index}>
                                            <div className="service-details-div-icon">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="none" className="table-icon">
                                                        <MdMoreVert color="#000000" size={25} />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdownmenu-custimize">
                                                        <Dropdown.Item className="userdrop1" onClick={() => openEditModal1(category)}>
                                                            <div className="userdrop">
                                                                <FaEdit color="#000000" size={20} />
                                                                <p>Edit</p>
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="userdrop1" onClick={() => handleDeletemain(category?._id)}>
                                                            <div className="userdrop">
                                                                <RiDeleteBin6Line
                                                                    color="#FF5534"
                                                                    size={20}
                                                                />
                                                                <p style={{ color: "#FF5534" }}>
                                                                    Delete
                                                                </p>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="service-details-div-div">
                                                <div className="service-details-image">
                                                    <img src={category.image} alt={category.name} />
                                                </div>
                                                <h6>{category.name}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </div>
                    <div className='service-details-categories'>
                        <label htmlFor="">Categories</label>
                        {loading ? (
                            <div className='normalloading'>
                                <img src={img} alt="" />
                            </div>
                        ) : !categoryData?.data ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            <div className='service-details-category'>
                                <Slider {...settings}>
                                    {categoryData?.data?.map((category, index) => (
                                        <div className="service-details-div" key={index}>
                                            <div className="service-details-div-icon">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="none" className="table-icon">
                                                        <MdMoreVert color="#000000" size={25} />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdownmenu-custimize">
                                                        <Dropdown.Item className="userdrop1" onClick={() => openEditModal(category)}>
                                                            <div className="userdrop">
                                                                <FaEdit color="#000000" size={20} />
                                                                <p>Edit</p>
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="userdrop1" onClick={() => handleDelete(category?._id)}>
                                                            <div className="userdrop">
                                                                <RiDeleteBin6Line
                                                                    color="#FF5534"
                                                                    size={20}
                                                                />
                                                                <p style={{ color: "#FF5534" }}>
                                                                    Delete
                                                                </p>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <Link to={`/service-management/service-details/${id}/${category.name}/${category._id}`} className="link">
                                                <div className="service-details-div-div">
                                                    <div className="service-details-image">
                                                        <img src={category.image} alt={category.name} />
                                                    </div>
                                                    <h6>{category.name}</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </div>
                    {/* <div className='service-details-categories partner'>
                        <label htmlFor="">Partner Lists</label>
                        <div className='bottomdashboard3 partner'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Phone No.</th>
                                        <th>City</th>
                                        <th>Jobs Completed</th>
                                        <th>Jobs Cancelled</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>#{order.id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.number}</td>
                                            <td>{order.city}</td>
                                            <td>{order.jobscompleted}</td>
                                            <td>{order.jobscancelled}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default HOC(ServiceDetails)