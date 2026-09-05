import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

import Login from './Login.jsx'
import Register from './Register.jsx';
import Home from './Home.jsx';
import Deposit from './Deposit.jsx';
import Withdraw from './Withdraw.jsx';
import Balance from './Balance.jsx';
import Loading from './Loading.jsx';
import ErrorPage from './ErrorPage.jsx';
import Beast from './Beast.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/deposit',
      element: <Deposit />
    },
    {
      path: '/withdraw',
      element: <Withdraw />
    },
    {
      path: '/balance',
      element: <Balance />
    },
    {
      path: '/settings',
      element: <Loading />
    },
    {
      path: '/errorPage',
      element: <ErrorPage />
    },,
    {
      path: '/beast',
      element: <Beast />
    }

  ]);

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

// npm install react-router-dom --> to use router provider

//Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force

export default App
