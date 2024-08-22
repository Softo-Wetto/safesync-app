import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <h1 className="hero-title">Welcome to My Website</h1>
                <p>Your one-stop solution for all things awesome.</p>
                <button className="cta-button">Get Started</button>
            </section>

            {/* Services Section */}
            <section className="services">
                <h2>Our Services</h2>
                <div className="services-list">
                    <div className="service">
                        <img src="https://via.placeholder.com/150" alt="Service 1" />
                        <h3>Service 1</h3>
                        <p>We offer exceptional service 1 that meets your needs.</p>
                    </div>
                    <div className="service">
                        <img src="https://via.placeholder.com/150" alt="Service 2" />
                        <h3>Service 2</h3>
                        <p>Our service 2 is designed to provide the best results.</p>
                    </div>
                    <div className="service">
                        <img src="https://via.placeholder.com/150" alt="Service 3" />
                        <h3>Service 3</h3>
                        <p>Experience the excellence of service 3 today.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about">
                <h2 className="about-title">About Us</h2>
                <p>
                    We are a passionate team dedicated to delivering top-notch services. Our mission is to make your life easier with our expertise and commitment.
                </p>
            </section>

            {/* Contact Section */}
            <section className="contact">
                <h2>Contact Us</h2>
                <p>
                    Have any questions? Reach out to us anytime, and we'll be happy to assist you.
                </p>
                <button className="contact-button">Contact Us</button>
            </section>
        </div>
    );
};

export default Home;
