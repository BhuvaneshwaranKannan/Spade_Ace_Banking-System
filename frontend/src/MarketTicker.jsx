import React from 'react'   

function MarketTicker() {
  return (
    
    <>

        <div className="market-ticker" aria-label="Market data">
          <div className="market-ticker-viewport">
            <div className="market-ticker-track">
              <div className="market-ticker-content">
                <span className="market-item"><strong>NIFTY 50</strong><span>25,341.20</span><em className="market-positive">▲ 0.82%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>SENSEX</strong><span>82,451.32</span><em className="market-positive">▲ 0.64%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>BANK NIFTY</strong><span>56,210.45</span><em className="market-negative">▼ 0.21%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>GOLD</strong><span>₹7,420</span><em className="market-positive">▲ 0.31%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>USD/INR</strong><span>₹87.12</span><em className="market-negative">▼ 0.12%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>NASDAQ</strong><span>21,480.90</span><em className="market-positive">▲ 0.45%</em></span>
              </div>
              <div className="market-ticker-content" aria-hidden="true">
                <span className="market-item"><strong>NIFTY 50</strong><span>25,341.20</span><em className="market-positive">▲ 0.82%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>SENSEX</strong><span>82,451.32</span><em className="market-positive">▲ 0.64%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>BANK NIFTY</strong><span>56,210.45</span><em className="market-negative">▼ 0.21%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>GOLD</strong><span>₹7,420</span><em className="market-positive">▲ 0.31%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>USD/INR</strong><span>₹87.12</span><em className="market-negative">▼ 0.12%</em></span>
                <span className="market-separator">•</span>
                <span className="market-item"><strong>NASDAQ</strong><span>21,480.90</span><em className="market-positive">▲ 0.45%</em></span>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default MarketTicker
