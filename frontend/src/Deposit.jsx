import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import dWallet from './assets/deposit-wallet.png'

import { Atom } from 'react-loading-indicators';

function Deposit() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");

    const [loading, setLoading] = useState(false);

    const [methodBox1, setMethodBox1] = useState(false);
    const [methodBox2, setMethodBox2] = useState(false);

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

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const depositAmount = parseInt(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        axios.post("http://localhost:8080/user/deposit", { amount: depositAmount }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert("Deposit successful!");
                setBalance(response.data.balance);
                setAmount("");
                navigate('/home');
            })
            .catch(error => {
                console.error("Deposit failed", error);
                alert("Deposit failed");
            });
    };

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
                <span className='on-loc mx-1'>Deposit</span>

                <div className="d-title">
                    <div>
                        <div className="deposit-title mt-2">
                            Deposit Money
                        </div>
                        <div className="deposit-title-sub">
                            Add Money to your Bank Account
                        </div>
                    </div>
                    <div className='d-title-icon mx-5'>
                        <img src={dWallet} alt="" />
                    </div>
                </div>
            </div>

            <div className="deposit-container1 mt-4">
                <div className="d-cont1-title">
                    Select Amount
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

            </div>

            <div className="deposit-container2 mt-4">

                <div className="d-cont1-title">
                    Deposit Amount
                </div>

                <div className="input-group mb-1">
                    <span className="input-group-text">$</span>
                    <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <span className="input-group-text">.00</span>
                </div>

                <div className="below-ig mx-3 mb-2">
                    Enter amount to deposit
                </div>

                <div className="d-cont1-title">
                    Quick Amount
                </div>

                <div className="quick-amount mx-5">
                    {[1, 100, 500, 1000, 5000, 10000].map(val => (
                        <div key={val} className="quick-amount-box text-center" onClick={() => setAmount(val.toString())} style={{ cursor: 'pointer' }}>
                            <div className="my-2">${val}</div>
                        </div>
                    ))}
                </div>

                <div className="d-cont1-title">
                    Deposit Method
                </div>

                <div className="deposit-method mx-5">

                    {
                        methodBox1 ? (<>
                            <div className="deposit-method-box-true" onClick={() => setMethodBox1(false)}>
                                <div className="d-method-icon">
                                    <i className="bi bi-bank"></i>
                                </div>

                                <div className="d-flex flex-column justify-content-center">
                                    <div className='d-method1 mb-3'>
                                        Bank Transfer
                                    </div>
                                    <div className='d-method1-details'>
                                        Add money using
                                    </div>
                                    <div className='d-method1-details'>
                                        NEFT / IMPS / RTGS
                                    </div>
                                </div>
                            </div>

                        </>) : (<>
                            <div className="deposit-method-box" onClick={() => {setMethodBox1(true); setMethodBox2(false)}}>
                                <div className="d-method-icon">
                                    <i className="bi bi-bank"></i>
                                </div>

                                <div className="d-flex flex-column justify-content-center">
                                    <div className='d-method1 mb-3'>
                                        Bank Transfer
                                    </div>
                                    <div className='d-method1-details'>
                                        Add money using
                                    </div>
                                    <div className='d-method1-details'>
                                        NEFT / IMPS / RTGS
                                    </div>
                                </div>
                            </div>
                        </>)
                    }

                    {
                        methodBox2 ? (<>
                            <div className="deposit-method-box-true" onClick={() => setMethodBox2(false)}>
                                <div className="d-method-icon ">
                                    <i className="bi bi-credit-card"></i>
                                </div>

                                <div className="d-flex flex-column justify-content-center">
                                    <div className='d-method1 mb-3'>
                                        From other account
                                    </div>
                                    <div className='d-method1-details'>
                                        Transfer from your
                                    </div>
                                    <div className='d-method1-details'>
                                        other bank account
                                    </div>
                                </div>
                            </div>
                        </>) : (<>
                            <div className="deposit-method-box" onClick={() => {setMethodBox2(true); setMethodBox1(false)}}>
                                <div className="d-method-icon ">
                                    <i className="bi bi-credit-card"></i>
                                </div>

                                <div className="d-flex flex-column justify-content-center">
                                    <div className='d-method1 mb-3'>
                                        From other account
                                    </div>
                                    <div className='d-method1-details'>
                                        Transfer from your
                                    </div>
                                    <div className='d-method1-details'>
                                        other bank account
                                    </div>
                                </div>
                            </div>
                        </>)
                    }

                </div>

                <div className="deposit-buttons mt-5 mx-5">
                    <button className="deposit-cancel" onClick={() => navigate('/home')}>Cancel</button>
                    <button className="deposit submit" onClick={handleSubmit}>Submit</button>
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

export default Deposit
