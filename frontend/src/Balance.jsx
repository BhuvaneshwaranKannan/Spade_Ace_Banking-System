import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Atom } from 'react-loading-indicators';

import balIcon from './assets/check-balance.png'

function Balance() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);

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
        }
    }, []);

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

            <div className='locator'>
                <span className='go-back mx-1' onClick={() => navigate('/home')}>Home</span>
                <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                <span className='on-loc mx-1'>Check Balance</span>

                <div className="b-title">
                    <div>
                        <div className="deposit-title mt-2">
                            Check Balance
                        </div>
                        <div className="deposit-title-sub">
                            View your account balances and financial details
                        </div>
                    </div>
                    <div className='d-title-icon'>
                        <img src={balIcon} alt="" />
                    </div>
                </div>
            </div>

            <div className="b-cont1-contentbox mt-4">

                <div className="b-cont1">

                    <div className="dc1-c1">
                        <i className="bi bi-wallet2"></i>
                    </div>

                    <div className="dc1-c2 d-flex flex-column justify-content-center">
                        <div>
                            Savings Account
                        </div>
                        <div className='mt-2'>
                            **** 6969
                        </div>
                    </div>

                    <div className="bc1-c3">
                        <div className="bc1-activeSymbol">
                            <i class="bi bi-dot"></i>
                        </div>
                        <div className='bc1-active'>
                            Active
                        </div>
                    </div>

                </div>
                <div className="balance-block mx-5">

                    <div className="bc1-balance">
                        Available Balance
                    </div>

                    <div className="show-balance">

                        {
                            toggle ? (
                                <>
                                    <div className="balance-amount">
                                        $*****
                                    </div>
                                    <div className="b-toggler" onClick={() => setToggle(false)}>
                                        <div className="b-toggle-icon">
                                            <i class="bi bi-eye"></i>
                                        </div>
                                        <div className="b-hide-balance">
                                            Show Balance
                                        </div>
                                    </div>
                                </>

                            ) : (
                                <>
                                    <div className="balance-amount">
                                        ${balance}
                                    </div>
                                    <div className="b-toggler" onClick={() => setToggle(true)}>
                                        <div className="b-toggle-icon">
                                            <i class="bi bi-eye-slash"></i>
                                        </div>
                                        <div className="b-hide-balance">
                                            Hide Balance
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>

            </div>

            <div className="b-acc-summary-title mt-3 my-3">
                Account Summary
            </div>


            <div className="b-acc-summary">
                <div className="b-as">
                    <div className='b-as-td-icon'>
                        <i class="bi bi-arrow-down"></i>
                    </div>
                    <div className='b-as-td-title'>
                        Total Deposit
                    </div>
                    <div className='b-as-td-amount'>
                        $98500
                    </div>
                </div>

                <div className="b-as">
                    <div className='b-as-tw-icon'>
                        <i class="bi bi-arrow-up"></i>
                    </div>
                    <div className='b-as-tw-title'>
                        Total Withdrawals
                    </div>
                    <div className='b-as-tw-amount'>
                        $1820
                    </div>
                </div>

                <div className="b-as">
                    <div className='b-as-tt-icon'>
                        <i class="bi bi-arrow-left-right"></i>
                    </div>
                    <div className='b-as-tt-title'>
                        Total Transfers
                    </div>
                    <div className='b-as-tt-amount'>
                        $1000
                    </div>
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
        </>
    )
}

export default Balance
