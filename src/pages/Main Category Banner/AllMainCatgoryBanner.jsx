import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { MdDelete } from "react-icons/md";



import img from '../../assest/loading1.gif'

const AllMainCatgoryBanner = () => {
    const navigate = useNavigate()

    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallmaincategoryBanner, {
            setResponse: setBannerData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Banner data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    const handleDelete = async (Id) => {
        await deleteApi(endPoints.deletemaincategorybanner(Id), {
            successMsg: "Main Category Banner deleted successfully!",
            errorMsg: "Failed to delete main category banner!",
            additionalFunctions: [fetchData],
        });
    };
    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Main Category Banners</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist5'>
                            <button onClick={() => navigate('/main-category/banners/add')}>Add new</button>
                        </div>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Banner</th>
                                    <th>Main Category Name</th>
                                    <th>Banner Position</th>
                                    <th>Banner Description</th>
                                    <th>Status</th>
                                    <th>Toggle</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                ) :
                                    bannerData?.data?.status === 0 ? (
                                        <tr>
                                            <td colSpan="8" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        bannerData?.data?.map((banner, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='bannerimagetable'>
                                                        <img src={banner.image} alt="" />
                                                    </div>

                                                </td>
                                                <td>{banner?.mainCategoryId?.name}</td>
                                                <td>{banner.position}</td>
                                                <td>{banner.desc}</td>
                                                <td>{banner.status ? "Active" : "Deactive"}</td>
                                                <td>
                                                    <div className='userlist7'>
                                                        <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                id="schedule-toggle"
                                                                checked={banner.status === true}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className='div-icons'>
                                                    <MdDelete onClick={() => handleDelete(banner?._id)} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(AllMainCatgoryBanner)