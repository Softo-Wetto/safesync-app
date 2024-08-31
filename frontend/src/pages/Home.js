import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            {/* GIF Banner Section */}
            <section className="gif-banner">
                <div className="gif-banner-overlay">
                    <h1 className="gif-banner-title">Welcome to Safesync</h1>
                    <p className="gif-banner-text">Your Safety, Our Priority</p>
                    <Link to="/about" className="btn btn-danger btn-lg mt-3">Learn More</Link>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="welcome-section text-center py-5">
                <div className="container">
                    <h2 className="welcome-title">Welcome to Safesync</h2>
                    <p className="welcome-text">
                        We are dedicated to providing top-tier safety solutions to ensure your peace of mind. Join us in making the world a safer place.
                    </p>
                    <Link to="/register" className="btn btn-warning btn-lg mt-3">Join Us Now!</Link>
                </div>
            </section>

            {/* Hero Section */}
            <section className="hero bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="hero-title display-4">Your Safety, Our Priority</h1>
                    <p className="lead">Your one-stop solution for all things awesome.</p>
                    <Link to="/login" className="btn btn-light btn-lg mt-3">Get Started</Link>
                </div>
            </section>

            {/* Services Section */}
            <section className="services py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Our Services</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://aware365.com.au/wp-content/uploads/2022/06/whs-system-compliance-expert-safety-consultant-australia.jpg" className="card-img-top" alt="Service 1" />
                                <div className="card-body">
                                    <h5 className="card-title">AUDITING</h5>
                                    <p className="card-text">WWe provide a wide range of safety audits from holistic legal and compliance audits right through to systems and customised safety audits to suit your unique needs. To find out more, get in touch.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://shedblog.com.au/wp-content/uploads/2023/12/Safety-glasses.png" className="card-img-top" alt="Service 2" />
                                <div className="card-body">
                                    <h5 className="card-title">CONSULTING</h5>
                                    <p className="card-text">My clients are my number one priority, and my services prove just how committed I am to their success. Book an introductory meeting today to learn more about how I can make your business thrive.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://s7d9.scene7.com/is/image/minesafetyappliances/2023-category-card-face-protection?scl=1" className="card-img-top" alt="Service 3" />
                                <div className="card-body">
                                    <h5 className="card-title">EXPERT OPINION</h5>
                                    <p className="card-text">We provide a wide range of safety audits from holistic legal and compliance audits right through to systems and customised safety audits to suit your unique needs. Contact us to find out how I can help today.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">About Us</h2>
                    <p className="text-center">
                        We are a passionate team dedicated to delivering top-notch services. Our mission is to make your life easier with our expertise and commitment.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact py-5">
                <div className="container text-center">
                    <h2>Contact Us</h2>
                    <p>
                        Have any questions? Reach out to us anytime, and we'll be happy to assist you.
                    </p>
                    <a href="/contact" className="btn btn-primary btn-lg mt-3">Contact Us</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
