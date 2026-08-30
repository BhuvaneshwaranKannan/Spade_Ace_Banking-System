import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate();

    return (
        <>
            <div className='barContainer'>
                <div>

                    <div className="d-flex flex-column gap-1">

                        <div className="p-2 navi" onClick={() => navigate('/')}>
                            <i className="sideIcon bi bi-house-door-fill"></i>Home
                        </div>

                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-wallet2"></i>My Accounts
                        </div>

                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-cash-coin"></i>Deposits
                        </div>

                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-graph-up-arrow"></i>Investments
                        </div>

                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-credit-card-2-front"></i>Cards
                        </div>

                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-receipt"></i>Loans
                        </div>

                        <div className="navi mb-5">
                            <div className="p-2">
                                <div className="sidebar-story-ring">

                                    {/* <img className='sidebar-profile-img' src={`${API}${user.profile_pic}`} alt="" /> */}

                                </div>
                            </div>
                            <span className='mx-1'>Profile</span>
                        </div>
                    </div>

                    <div className="d-flex flex-column mt-4 gap-1">
                        <div className="p-2 navi" onClick={() => navigate('/settings')}>
                            <i className="sideIcon bi bi-gear"></i>Settings
                        </div>
                        
                        <div className="p-2 navi">
                            <i className="sideIcon bi bi-shield-lock"></i>Security
                        </div>

                        <div className="p-2 navi">
                            <i className='bi-grid-fill'></i>
                            Also from SAB
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Sidebar