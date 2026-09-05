import { useEffect, useState } from 'react';
import banklogo from './assets/bank-logo.png'
import { useNavigate } from 'react-router-dom'
import { IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Beast from './Beast.jsx';

function Navbar(props) {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <div className="login-nav">
                <div className="login-logo">
                    <img src={banklogo} alt="logo" />
                </div>

                <div className="login-dd d-flex align-items-center gap-3 pe-4">

                    {
                        props.usage === 'home' ? (
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle profile-icon mx-2"></i>
                                    Profile
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" type="button">View Profile</button></li>
                                    <li><button className="dropdown-item" type="button">Settings</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={() => navigate('/')}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-translate profile-icon mx-2"></i>
                                    Language
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" type="button">English</button></li>
                                    <li><button className="dropdown-item" type="button">Hindi</button></li>
                                </ul>
                            </div>
                        )
                    }

                    <button
                        className="btn btn-outline-danger"
                        onClick={toggleTheme}
                        title="Toggle Dark Mode"
                    >
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>

                    {props.usage === 'home' ? (<>
                        <IconButton aria-label="show 99 unread messages"
                        sx={{
                            color: 'orangered',
                            '& .MuiSvgIcon-root': {
                                color: '#ff8800',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(165, 161, 161, 0.37)',
                            },
                        }}
                    >
                        <Badge color="" badgeContent={0} showZero>
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    </>) : (<>

                    </>)}

                </div>

            </div>
        </>
    )
}

export default Navbar
