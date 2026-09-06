import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ftIcon from './assets/ft-image.png'

import { Atom } from 'react-loading-indicators';

function FundTransfer() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [userId, setUserId] = useState("");

    const [loading, setLoading] = useState(false);

    const [cd, setCd] = useState(false);
    const [ts, setTs] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoading(true);
            axios.get("http://localhost:8080/user/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setBalance(response.data.balance);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
                .catch(error => {
                    console.error("Failed to fetch balance", error);
                    setLoading(false);
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);



    return (
        <>
            {
                loading ? (
                    <div className='loading-effect'>
                        <Atom color="#df7000" size="large" text="" textColor="" />
                    </div>
                ) : (
                    <></>
                )
            }
            <Navbar usage="home" />

            <div>
                <Sidebar />
            </div>


            {
                cd ? (<>
                    <div className='locator'>
                        <span className='go-back mx-1' onClick={() => navigate('/home')}>Home</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='go-back mx-1' onClick={() => setCd(false)}>Fund Transfer</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='on-loc mx-1'>Confirm Details</span>

                        <div className="ft-title">
                            <div>
                                <div className="deposit-title mt-2">
                                    Fund Transfer
                                </div>
                                <div className="deposit-title-sub">
                                    Transfer money securely to another account
                                </div>
                            </div>
                            <div className='d-title-icon mx-5'>
                                <img src={ftIcon} alt="" />
                            </div>
                        </div>
                        <div className="ft-process mt-4">
                            <div className="ft-step0"><i class="bi bi-check-lg"></i></div>Transfer details <span className="ft-step-split ft-step1-text">---</span>
                            <div className="ft-step1">2</div> <div className='ft-step1-text'>Confirm details</div> <span className="ft-step-split">---</span>
                            <div className="ft-step">3</div>Transfer Successful
                        </div>
                    </div>

                    <div className="ft-container1 mt-4">
                        <div className="d-cont1-title">
                            Transfer Summary
                        </div>

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ftc1-c2 d-flex flex-column justify-content-center">
                                <span className='ft-c1-header'>
                                    From Account
                                </span>
                                <div>
                                    Savings Account
                                </div>
                                <span className='ft-c1-header'>
                                    **** 6969
                                </span>
                            </div>
                            <div className="dc1-c3">
                                <div>
                                    ${balance}
                                </div>
                                <div>
                                    Available Balance
                                </div>
                            </div>
                        </div>

                        <div className="ft-ts-split"></div>

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ftc1-c2 d-flex flex-column justify-content-center">
                                <span className='ft-c1-header'>
                                    To Account
                                </span>
                                <div>
                                    Vishal
                                </div>
                                {/* <span className='ft-c1-header'>
                                    Spade Ace Bank
                                </span> */}
                                <span className='ft-c1-header'>
                                    **** 6969
                                </span>

                            </div>
                            <div className="ftc1-c3">
                                <div className='ft-ts2'>
                                    View Recipient
                                </div>
                            </div>
                        </div>

                        {/* <div className="ft-ts-split"></div> */}

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ft-c1-header">
                                <div>
                                    Transfer Amount
                                </div>
                            </div>
                            <div className="ftc1-c3 p-5">
                                <div>
                                    ${balance}
                                </div>
                            </div>
                        </div>

                        {/* <div className="ft-ts-split"></div> */}

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ft-c1-header">
                                <div>
                                    Transfer Fee
                                </div>
                            </div>
                            <div className="ftc1-c3">

                                <div className='cd-mis p-2'>
                                    ${balance}
                                </div>

                            </div>
                        </div>

                        {/* <div className="ft-ts-split"></div> */}

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ft-c1-header">
                                <div>
                                    Total Amount
                                </div>
                            </div>
                            <div className="ftc1-c3">
                                <div className='cd-mis'>
                                    ${balance}
                                </div>
                            </div>
                        </div>

                        {/* <div className="ft-ts-split"></div> */}

                        {/* <div className="ft-cont1-contentbox"> 
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ft-c1-header">
                                <div>
                                    Description
                                </div>
                            </div>
                            <div className="dc1-c3">
                                <div>
                                    
                                </div>
                            </div>
                        </div> */}

                        <div className="ft-ts-split"></div>

                        <div className="ft-cont1-contentbox">
                            <div className="ftc1-c1">
                                <i className="bi bi-wallet2"></i>
                            </div>
                            <div className="ftc1-c2">
                                <div>
                                    Remaining Balance
                                </div>
                            </div>
                            <div className="ftc1-c3">
                                <div>
                                    ${balance}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="deposit-container3 ftc3 mt-4">
                        <div className="dc3-icon mx-3">
                            <i class="bi bi-info-circle"></i>
                        </div>
                        <div className="ftc3-content">
                            <div>
                                Please ensure all the details are correct.
                            </div>
                            <div>
                                Once confirmed, the transfer will be processed immediately.
                            </div>
                        </div>
                        <div className="deposit-buttons mx-5">
                            <button className="cd-buttons" onClick={() => { setTs(false); setCd(false); }}>
                                <i class="bi bi-arrow-left mx-1"></i>
                                <span>
                                    Back
                                </span>
                            </button>
                            <button className="cd-buttons" onClick={() => { setTs(true); setCd(false); }}>
                                <span>
                                    Continue
                                </span>
                                <i class="bi bi-arrow-right mx-1"></i>
                            </button>
                        </div>

                    </div>
                </>) : ts ? (<>
                    <div className='locator'>
                        <span className='go-back mx-1' onClick={() => navigate('/home')}>Home</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='go-back mx-1' onClick={() => { setCd(false); setTs(false) }}>Fund Transfer</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='go-back mx-1'>Confirm Details</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='on-loc-final mx-1'>Transfer Successful</span>

                        <div className="ft-title">
                            <div>
                                <div className="deposit-title mt-2">
                                    Fund Transfer
                                </div>
                                <div className="deposit-title-sub">
                                    Transfer money securely to another account
                                </div>
                            </div>
                            <div className='d-title-icon mx-5'>
                                <img src={ftIcon} alt="" />
                            </div>
                        </div>
                        <div className="ft-process mt-4">
                            <div className="ft-step0"><i class="bi bi-check-lg"></i></div>Transfer details <span className="ft-step-split">---</span>
                            <div className="ft-step0"><i class="bi bi-check-lg"></i></div>Confirm details <span className="ft-step-split ft-final-step-text">---</span>
                            <div className="ft-step1 ft-final-step">3</div> <div className='ft-final-step-text'>Transfer Successful</div>
                        </div>
                    </div>

                    <div className="ft-container1 ft-ts mt-4">
                        <div className='ft-ts-headerCont'>

                            <div className='ft-ts-icon'>
                                <i class="bi bi-check2-circle"></i>
                            </div>

                            <div className='ft-ts-header'>
                                Transfer Successful
                            </div>

                            <div className='ft-ts-content'>
                                The amount has been transfered to recipient's account.
                            </div>

                        </div>

                        <div className="ft-ts-divider my-3"></div>

                        <div className="ft-ts-amount">
                            ${balance}
                        </div>

                        <div className="ft-ts-summary mx-4 mt-4">
                            <div className='ft-ts-s-items'>
                                <div>
                                    Transaction ID
                                </div>
                                <div>
                                    TNF7453CS
                                </div>
                            </div>
                            <div className='ft-ts-s-items'>
                                <div>
                                    Date & Time
                                </div>
                                <div>
                                    08-Aug-2026 06:09 PM
                                </div>
                            </div>
                            <div className='ft-ts-s-items'>

                                <div>
                                    From Account
                                </div>
                                <div>
                                    Savings Account **** 6969
                                </div>
                            </div>
                            <div className='ft-ts-s-items'>

                                <div>
                                    To Account
                                </div>
                                <div>
                                    Vishal **** 6969
                                </div>
                            </div>
                            <div className='ft-ts-s-items'>

                                <div>
                                    Transfer Fee
                                </div>
                                <div>
                                    ${balance}
                                </div>
                            </div>
                            <div className='ft-ts-s-items ft-ts-s-last'>
                                <div>
                                    Description
                                </div>
                                <div>
                                    xxxxxxxxxx
                                </div>
                            </div>
                        </div>
                        <div className="ft-buttons mx-5 mt-4">
                            <button className="ft-b-items" onClick={() => { }}>
                                <i class="bi bi-file-earmark-ruled"></i>
                                <span>View Transaction </span>
                            </button>
                            <button className="ft-b-items" onClick={() => { navigate('/home') }}>
                                <i class="bi bi-house-door-fill"></i>
                                <span>Back to Home</span>
                            </button>
                        </div>
                    </div>

                    <div className="deposit-container3 mt-4">
                        <div className="dc3-icon mx-3">
                            <i className="bi bi-shield-lock-fill"></i>
                        </div>
                        <div className="dc3-content">
                            Your transactions are secure and encrypted
                        </div>
                    </div>

                </>) :

                    (<>
                        <div className='locator'>
                            <span className='go-back mx-1' onClick={() => navigate('/home')}>Home</span>
                            <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                            <span className='on-loc mx-1'>Fund Transfer</span>

                            <div className="ft-title">
                                <div>
                                    <div className="deposit-title mt-2">
                                        Fund Transfer
                                    </div>
                                    <div className="deposit-title-sub">
                                        Transfer money securely to another account
                                    </div>
                                </div>
                                <div className='d-title-icon mx-5'>
                                    <img src={ftIcon} alt="" />
                                </div>
                            </div>
                            <div className="ft-process mt-4">
                                <div className="ft-step1">1</div> <div className='ft-step1-text'>Transfer details</div><span className="ft-step-split">---</span>
                                <div className="ft-step">2</div>Confirm details <span className="ft-step-split">---</span>
                                <div className="ft-step">3</div>Transfer Successful
                            </div>
                        </div>
                        <div className="ft-container1 mt-4">
                            <div className="d-cont1-title">
                                From Account
                            </div>

                            <div className="d-cont1-contentbox">

                                <div className="dc1-c1">
                                    <i className="bi bi-wallet2"></i>
                                </div>

                                <div className="dc1-c2 d-flex flex-column justify-content-center">
                                    <div>
                                        Savings Account
                                    </div>
                                    <div>
                                        **** 6969
                                    </div>
                                </div>

                                <div className="dc1-c3">
                                    <div>
                                        ${balance}
                                    </div>
                                    <div>
                                        Available Balance
                                    </div>
                                </div>

                                <div className="dc1-c4">
                                    <i className="bi bi-chevron-down"></i>
                                </div>
                            </div>

                            <form className="ft-form mt-4">
                                <div className="mx-4">
                                    <label htmlFor="userId" className="form-label fw-semibold">To Account Number</label>
                                    <input type="text" inputMode="numeric" pattern="[0-9]+" className="form-control custom-input" id="userId" placeholder="Enter Account Number" value={userId} onChange={(e) => { setUserId(e.target.value) }} required />
                                </div>

                                <div className="mx-4">
                                    <label htmlFor="userId" className="form-label fw-semibold">Confirm Account Number</label>
                                    <input type="text" inputMode="numeric" pattern="[0-9]+" className="form-control custom-input" id="userId" placeholder="Re-Enter Account Number" value={userId} onChange={(e) => { setUserId(e.target.value) }} required />
                                </div>

                                <div className="mx-4">
                                    Enter Amount

                                    <div className="input-group mb-1">
                                        <span className="input-group-text">$</span>
                                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                        <span className="input-group-text">.00</span>
                                    </div>
                                </div>

                                <div className="mx-4">
                                    Description (Optional)
                                    <div class="form-floating">
                                        <textarea class="form-control ft-comment" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                        <label for="floatingTextarea2">Comments</label>
                                    </div>
                                </div>

                                <div className="deposit-buttons mx-5">
                                    <button className="deposit-cancel" onClick={() => setCd(true)}>Continue<i class="bi bi-arrow-right mx-1"></i> </button>
                                </div>
                            </form>
                        </div>
                        <div className="deposit-container3 mt-4">
                            <div className="dc3-icon mx-3">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <div className="dc3-content">
                                Your transactions are secure and encrypted
                            </div>
                        </div>
                    </>)
            }
        </>
    )
}

export default FundTransfer