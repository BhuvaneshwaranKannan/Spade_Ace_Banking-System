import React from 'react'
import errorVideo from './assets/error.mp4'
import crackedBg from './assets/cracked.jpg'
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

function ErrorPage(props) {
  return (
    // <div
    //   style={{
    //     width: '100vw',
    //     height: '100vh',
    //     position: 'relative',
    //     overflow: 'hidden',
    //     backgroundImage: `url(${crackedBg})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <div
    //     style={{
    //       position: 'absolute',
    //       inset: 0,
    //       background: 'rgba(0, 0, 0, 0.38)',
    //     }}
    //   />

    //   <video
    //     src={errorVideo}
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     style={{
    //       width: '48vw',
    //       maxWidth: '600px',
    //       height: 'auto',
    //       objectFit: 'contain',
    //       borderRadius: '20px',
    //       boxShadow: '0 0 30px rgba(0,0,0,0.5)',
    //       position: 'relative',
    //       zIndex: 1,
    //     }}
    //   />

    <div className='errr'>
      <div className='err-icon'>
        <SentimentVeryDissatisfiedOutlinedIcon />
      </div>
      <div className="err-msg">
      {props.errormsg}
      </div>
    </div>
  )
}

export default ErrorPage
