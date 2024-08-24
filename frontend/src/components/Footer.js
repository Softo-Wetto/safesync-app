// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>About Safesync</h5>
                        <p>Your one-stop solution for all things awesome. We provide top-notch services to make your life more productive.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/about" className="text-white">About</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <p><i className="fas fa-map-marker-alt"></i> 123 Main Street, Anytown, AUS</p>
                        <p><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</p>
                        <p><i className="fas fa-envelope"></i> support@safesync.com</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <a href="https://www.facebook.com/YourPage" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com/YourPage" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/YourPage" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/YourPage" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <p>&copy; 2024 Safesync. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
