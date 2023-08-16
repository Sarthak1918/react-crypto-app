import React from 'react'
import "../styles/Footer.scss"
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <Link to="/" className='logo'>
                    <h1>XCRYPTO</h1>
                </Link>
                <div className="footer-section">
                    <h3>Real-Time Cryptocurrency Prices</h3>
                    <p>Stay updated with the latest prices of popular cryptocurrencies.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>If you have any questions or feedback, feel free to get in touch.</p>
                    <p>Email: contact@XCRYPTO.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 XCRYPTO. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
