import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import PartnerProfile from './PartnerProfile';

import img from '../../assest/img9.png'

const PartnerHub = () => {
    return (
        <>
            <PartnerProfile active={"Hub"} />
            <div className='userspayments'>
                <div className='partnerhub-container'>
                    <div className='partnerhub-header'>
                        <div className='partnerhub-header1 active'>
                            <h6>Ravet sector 412101</h6>
                        </div>
                        <div className='partnerhub-line'>

                        </div>
                        <div className='partnerhub-header1'>
                            <h6>Kothrud</h6>
                        </div>
                    </div>
                    <div className='partnerhub-main-map'>
                        <img src={img} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(PartnerHub)