import Navbar from "./Navbar"
import RegisterTerms from "./RegisterTerms"

function Register() {
    return (
        <>
            <Navbar />

            <div>
                <RegisterTerms />
            </div>

            <div className="reg-footer">
                <div className="reg-footer-text my-3">

                    © 2026 Spade Ace Bank Ltd. All Rights Reserved.
                    |
                    <a href="">
                        Security Information
                    </a>
                    |
                    <a href="">
                        Terms and Conditions
                    </a>
                </div>
            </div>
        </>
    )
}

export default Register
