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
                    Relay Consulting Services originated as a consultancy service to high risk, complex and custom orientated clients. 
                    We have been in work health and safety for over 20 years with some 100+ years of experience across a wide range of 
                    businesses and industries. If you are seeking help or assistance and want somebody that doesn’t apply a one size 
                    fits all but takes the time to understand you and your business then give us a call.
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
                            <h4>Terry Brennan</h4>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="col-lg-4 col-md-6 team-member">
                            <img src="https://via.placeholder.com/150" alt="Jane Smith" />
                            <h4>Ryan Alexios</h4>
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
