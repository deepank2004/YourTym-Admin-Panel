import React from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { AiFillPlusSquare } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditSubCategory = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit custom package</h6>
                    </div>
                    <div className='addcategory-btn'>
                        <div className='partnerprofile-btn'>
                            <button onClick={() => navigate('/service-management/edit-service/edit-category')}>Cancel</button>
                        </div>
                        <div className='addserivce-btn'>
                            <button onClick={() => navigate('/service-management/edit-service/edit-category')}>Save</button>
                        </div>
                    </div>
                </div>
                <div className='addservice-main'>
                    <div className='addservice-container'>
                        <div className='addservice-left'>
                            <div className='addcategory-left-div'>
                                <div className='addcategory-left-icons'>
                                    <label htmlFor="">Sub Category</label>
                                    <div className='addcategory-left-icon'>
                                        <p>Add</p>
                                        <AiFillPlusSquare color='#000000' size={25} />
                                    </div>
                                </div>
                                <div className='addcategory-left-inputs'>
                                    <input type="text" placeholder='Enter sub category' />
                                </div>
                            </div>
                            <div className='addsubcategory-left-div'>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Price</label>
                                    <input type="text" placeholder='Enter Price' />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Time</label>
                                    <input type="text" placeholder='Enter Time' />
                                </div>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">YT Promise</label>
                                <input type="text" placeholder='Enter Price' />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Description</label>
                                <textarea placeholder='Write a description' />
                                <p>Do not exceed 100 characters when entering the product name.</p>
                            </div>
                            <div className='addcategory-left-div'>
                                <div className='addcategory-left-icons'>
                                    <label htmlFor="">Package</label>
                                    <div className='addcategory-left-icon'>
                                        <p>Add</p>
                                        <AiFillPlusSquare color='#000000' size={25} />
                                    </div>
                                </div>
                                <div className='addcategory-left-inputs'>
                                    <input type="text" placeholder='Enter category' />
                                </div>
                            </div>
                            <div className='addcategory-left-div'>
                                <div className='addcategory-left-icons'>
                                    <label htmlFor="">Package option</label>
                                    <div className='addcategory-left-icon'>
                                        <p>Add</p>
                                        <AiFillPlusSquare color='#000000' size={25} />
                                    </div>
                                </div>
                                <div className='addcategory-left-inputs'>
                                    <input type="text" placeholder='Enter option' />
                                </div>
                            </div>
                            <div className='addsubcategory-left-div-div'>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Types</label>
                                    <input type="text" placeholder='Enter option' />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Price</label>
                                    <input type="text" placeholder='Enter Price' />
                                </div>
                                <div className='addservice-left-div'>
                                    <label htmlFor="">Time</label>
                                    <input type="text" placeholder='Enter Time' />
                                </div>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Description</label>
                                <textarea placeholder='Write a description' />
                                <p>Do not exceed 100 characters when entering the product name.</p>
                            </div>
                        </div>
                        <div className='addservice-right'>
                            <div className='addservice-right-div'>
                                <label htmlFor="">Add image</label>
                                <div className='addservice-right-image'>
                                    <FiUpload color='#979797' size={25} />
                                    <p>Upload Image</p>
                                    <div className='addserivce-btn'>
                                        <button>Upload Image</button>
                                    </div>
                                </div>
                            </div>
                            <div className='editservice-container'>
                                <div className='editservice-left'>
                                    <CiImageOn />
                                    <div className='editservice-left-content'>
                                        <h6>Image.pmgl</h6>
                                        <p>200 KB</p>
                                    </div>
                                </div>
                                <div className='editservice-delete'>
                                    <RiDeleteBin6Line />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(EditSubCategory)