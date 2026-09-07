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
    const [depositedAmount, setDepositedAmount] = useState("");

    const [loading, setLoading] = useState(false);

    const [methodBox1, setMethodBox1] = useState(false);
    const [methodBox2, setMethodBox2] = useState(false);

    const [ds, setDs] = useState(false);
    const [error, setError] = useState("");

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
            // alert("Please enter a valid amount");
            setError("!! Please enter a valid amount !!");
            return;
        }

        axios.post("http://localhost:8080/user/deposit", { amount: depositAmount }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // alert("Deposit successful!");
                setBalance(response.data.balance);
                setDepositedAmount(depositAmount);
                setAmount("");
                setDs(true);
            })
            .catch(error => {
                console.error("Deposit failed", error);
                setError("Deposit failed! Login the app to continue.");
                alert("Session Expired. Login again!!");
                navigate('/');
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

            {
                ds ? (<>

                    <div className='locator'>
                        <span className='go-back mx-1' onClick={() => navigate('/home')}>Home</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='go-back mx-1' onClick={() => setDs(false)}>Deposit</span>
                        <span className='mx-1'><i className="bi bi-chevron-right"></i></span>
                        <span className='on-loc-final mx-1'>Deposit Successfull</span>

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

                    <div className="ft-container1 d-s mt-4">
                        <div className='ft-ts-headerCont'>

                            <div className='ft-ts-icon'>
                                <i class="bi bi-check2-circle"></i>
                            </div>

                            <div className='ft-ts-header'>
                                Deposit Successful
                            </div>

                            <div className='ft-ts-content'>
                                ${depositedAmount} has been added to your bank account.
                            </div>

                        </div>

                        <div className="ft-ts-divider my-3"></div>

                        <div className="d-success">
                            <div className='d-s-ub mt-4'>
                                Updated balance
                            </div>
                            <div className='ft-ts-amount'>
                                ${balance}
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

                </>) : (<>
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
                    <div>
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

                            <div className="input-group mb-1 mx-4">
                                <span className="input-group-text">$</span>
                                <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={amount} onChange={(e) => { setAmount(e.target.value); setError(""); }} />
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
                                    <div key={val} className="quick-amount-box text-center" onClick={() => { setAmount(val.toString()); setError(""); }} style={{ cursor: 'pointer' }}>
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
                                        <div className="deposit-method-box-true" onClick={() => { setMethodBox1(false); setError(""); }}>
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
                                        <div className="deposit-method-box" onClick={() => { setMethodBox1(true); setMethodBox2(false); setError(""); }}>
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
                                        <div className="deposit-method-box-true" onClick={() => { setMethodBox2(false); setError(""); }}>
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
                                        <div className="deposit-method-box" onClick={() => { setMethodBox2(true); setMethodBox1(false); setError(""); }}>
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

                            <div className="d-error-msg mt-3 mx-5">
                                <div>
                                    ㅤ
                                </div>
                                {error}
                            </div>

                            <div className="deposit-buttons mt-4 mx-5">
                                <button onClick={() => navigate('/home')}>Cancel</button>
                                {
                                    methodBox1 || methodBox2 ? (<>
                                        <button onClick={handleSubmit}>Submit</button>
                                    </>) : (<>
                                        <button onClick={() => setError("!! Select any method to proceed !!")}>Submit</button>
                                    </>)
                                }

                            </div>


                        </div>
                    </div>
                </>)
            }


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
