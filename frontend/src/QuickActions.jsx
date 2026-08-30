import React from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function QuickActions() {
    const navigate = useNavigate();
  return (
    <>
        <div className="home-container">
          <div className="home-container-header">
            Quick Actions
          </div>
          <button className="icon-container" type="button" onClick={() => navigate('/balance')}>
            <i className="main-icon bi bi-wallet2"></i>
            <span>Check Balance</span>
          </button>
          <button className="icon-container" type="button">
            <i className="main-icon bi bi-send"></i>
            <span>Fund Transfer</span>
          </button>
          <button className="icon-container" type="button" onClick={() => navigate('/deposit')}>
            <i className="main-icon bi bi-cash-coin"></i>
            <span>Deposit</span>
          </button>
          <button className="icon-container" type="button" onClick={() => navigate('/withdraw')}>
            <i className="main-icon bi bi-cash-stack"></i>
            <span>Withdraw</span>
          </button>
          <button className="icon-container" type="button">
            <i className="main-icon bi bi-receipt"></i>
            <span>Transactions</span>
          </button>
          <button className="icon-container" type="button">
            <i className="main-icon bi bi-graph-up-arrow"></i>
            <span>Insights</span>
          </button>
          <button className="icon-container" type="button">
            <i className="main-icon bi bi-headset"></i>
            <span>Support</span>
          </button>
        </div>
    </>
  )
}

export default QuickActions
