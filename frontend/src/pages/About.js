import React from 'react';
import './About.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1>About Safesync</h1>
                    <p>Your safety, our priority.</p>
                </div>
            </section>

            {/* About Description Section */}
            <section className="about-description">
                <div className="container">
                    <h2>Who We Are</h2>
                    <p>
                        At Safesync, we are dedicated to providing top-tier safety solutions to ensure your peace of mind.
                        Our team of experts is committed to making the world a safer place by delivering innovative and reliable
                        safety products and services. Whether you are a small business or a large corporation, we are here to
                        support you every step of the way.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2>Meet Our Team</h2>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 team-member">
                            <img src="https://via.placeholder.com/150" alt="John Doe" />
                            <h4>John Doe</h4>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="col-lg-4 col-md-6 team-member">
                            <img src="https://via.placeholder.com/150" alt="Jane Smith" />
                            <h4>Jane Smith</h4>
                            <p>Chief Technology Officer</p>
                        </div>
                        <div className="col-lg-4 col-md-6 team-member">
                            <img src="https://via.placeholder.com/150" alt="Emily Johnson" />
                            <h4>Emily Johnson</h4>
                            <p>Head of Marketing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Join Us in Making the World Safer</h2>
                    <p>Contact us today to learn more about our products and services.</p>
                    <a href="/contact" className="btn btn-primary">Get in Touch</a>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
