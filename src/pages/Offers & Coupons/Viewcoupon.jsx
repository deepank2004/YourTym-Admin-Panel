import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";


const Viewcoupon = () => {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Coupon Details</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button onClick={() => navigate('/offers_coupons/coupons')}>Update</button>
                    </div>
                </div>


                <div className='addbanner-container'>
                    <div className='addservice-left-div'>
                        <label htmlFor="">Offer Name </label>
                        <input type="text" placeholder='Enter offer name' />
                    </div>
                    <div className='addservice-left-div'>
                        <label htmlFor="">Coupon Code</label>
                        <input type="text" placeholder='Enter coupon code' />
                    </div>
                    <div className='addsubcategory-left-div'>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Number of times coupon can be used</label>
                            <input type="text" placeholder='Total redemption' />
                            <div className='addcoupon-main'>
                                <input type="checkbox" />
                                <p>Check, if you want to set number of times to unlimited</p>
                            </div>
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Services</label>
                            <select name="" id="">
                                <option value="">Choose</option>
                                <option value="">Home</option>
                                <option value="">Waxing </option>
                            </select>
                        </div>
                    </div>
                    <div className='addservice-left-div'>
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" placeholder='Write a description'></textarea>
                    </div>
                    <div className='addservice-left-div'>
                        <label htmlFor="">Discount Type</label>
                        <div className='addoffer-type'>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="offer"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={handleChange}
                                />
                                <span className="circle"></span>
                                Discount Amount
                            </label>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="offer"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={handleChange}
                                />
                                <span className="circle"></span>
                                Percentage Discount
                            </label>
                            <label className="custom-radio">
                                <input
                                    type="radio"
                                    name="offer"
                                    value="option3"
                                    checked={selectedOption === "option3"}
                                    onChange={handleChange}
                                />
                                <span className="circle"></span>
                                Free Service
                            </label>
                        </div>
                    </div>
                    <div className='addsubcategory-left-div'>
                        {selectedOption === "option1" &&
                            <div className='addservice-left-div'>
                                <label htmlFor="">Flat Discount Amount</label>
                                <input type="text" placeholder='$ Enter discount amount' />
                            </div>
                        }
                        {selectedOption === "option2" &&
                            <div className='addservice-left-div'>
                                <label htmlFor="">Percentage Amount</label>
                                <input type="text" placeholder='% 20' />
                            </div>
                        }
                        {selectedOption === "option2" &&
                            <div className='addservice-left-div'>
                                <label htmlFor="">Max Discount Upto</label>
                                <input type="text" placeholder='$ 399' />
                            </div>
                        }
                        {selectedOption === "option3" &&
                            <div className='addservice-left-div'>
                                <label htmlFor="">Choose Service</label>
                                <select name="" id="">
                                    <option value="">Choose</option>
                                </select>
                            </div>
                        }
                        <div className='addservice-left-div'>
                            <label htmlFor="">Start Date </label>
                            <input type="date" placeholder='Enter Benefits' />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Start Time</label>
                            <input type="time" placeholder='Enter Benefits' />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">End Date </label>
                            <input type="date" placeholder='Enter Benefits' />
                            <div className='addcoupon-main'>
                                <input type="checkbox" />
                                <p>Check, if you want to set coupon validity for lifetime</p>
                            </div>
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">End Time</label>
                            <input type="time" placeholder='Enter Benefits' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Viewcoupon)