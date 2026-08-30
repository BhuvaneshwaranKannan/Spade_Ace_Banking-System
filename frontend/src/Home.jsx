import { useEffect, useState } from 'react'
import MarketTicker from './MarketTicker'
import Navbar from './Navbar'
import QuickActions from './QuickActions'
import Sidebar from './Sidebar'

import x1 from './assets/bg.jpg'
import x2 from './assets/bg2.jpg'


function Home() {

  return (
    <>
      <Navbar usage="home" />
      <div>
        <MarketTicker />
      </div>

      <div>
        <Sidebar />
      </div>

      <div className="dashboard">

        <div id="carouselExampleAutoplaying" className="dashboard-carousel carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={x1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={x2} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        <QuickActions />

      </div>
    </>
  )
}

export default Home
