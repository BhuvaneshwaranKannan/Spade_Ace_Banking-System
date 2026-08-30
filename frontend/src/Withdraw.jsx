import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import MarketTicker from './MarketTicker'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import wWallet from './assets/withdraw-wallet.png'

import { Atom } from 'react-loading-indicators';

function Withdraw() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

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
          }, 1000)
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
    const withdrawAmount = parseInt(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (withdrawAmount > balance) {
      alert("Insufficient balance");
      return;
    }

    axios.post("http://localhost:8080/user/withdraw", { amount: withdrawAmount }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert("Withdrawal successful!");
        setBalance(response.data.balance);
        setAmount("");
        navigate('/home');
      })
      .catch(error => {
        console.error("Withdrawal failed", error);
        alert("Withdrawal failed");
      });
  };

  const parsedAmount = parseInt(amount) || 0;

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
        <span className='on-loc mx-1'>Withdraw</span>

        <div className="w-title">
          <div>
            <div className="deposit-title mt-2">
              Withdraw Money
            </div>
            <div className="deposit-title-sub">
              Withdraw Money to your Bank Account
            </div>
          </div>
          <div className='d-title-icon mx-5'>
            <img src={wWallet} alt="" />
          </div>
        </div>
      </div>

      <div className="deposit-container1 mt-4">
        <div className="d-cont1-title">
          Select Account
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

      <div className="withdraw-container2 mt-4">

        <div className="d-cont1-title">
          Withdraw Amount
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">$</span>
          <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <span className="input-group-text">.00</span>
        </div>

        <div className="below-ig mx-3 mb-2">
          Enter amount to withdraw
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
      </div>

      <div className="withdraw-container3 mt-4">

        <div className="d-cont1-title">
          Transaction Summary
        </div>

        <div className="trans-sum mx-3 my-3">
          <div>
            Available Balance
          </div>
          <div>
            ${balance.toFixed(2)}
          </div>
        </div>
        <div className="trans-sum mx-3 my-3">
          <div>
            Withdrawal Amount
          </div>
          <div>
            -${parsedAmount.toFixed(2)}
          </div>
        </div>

        <div className="trans-sum-line"></div>

        <div className="trans-sum-total mx-3 my-3">
          <div>
            Remaining Balance
          </div>
          <div>
            ${(balance - parsedAmount).toFixed(2)}
          </div>
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

export default Withdraw
