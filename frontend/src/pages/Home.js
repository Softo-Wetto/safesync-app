import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="hero-title display-4">Welcome to Safesync</h1>
                    <p className="lead">Your one-stop solution for all things awesome.</p>
                    <button className="btn btn-light btn-lg mt-3">Get Started</button>
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
                                    <h5 className="card-title">Service 1</h5>
                                    <p className="card-text">We offer exceptional service 1 that meets your needs.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://shedblog.com.au/wp-content/uploads/2023/12/Safety-glasses.png" className="card-img-top" alt="Service 2" />
                                <div className="card-body">
                                    <h5 className="card-title">Service 2</h5>
                                    <p className="card-text">Our service 2 is designed to provide the best results.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://s7d9.scene7.com/is/image/minesafetyappliances/2023-category-card-face-protection?scl=1" className="card-img-top" alt="Service 3" />
                                <div className="card-body">
                                    <h5 className="card-title">Service 3</h5>
                                    <p className="card-text">Experience the excellence of service 3 today. We can get you booked.</p>
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
                    <button className="btn btn-primary btn-lg mt-3">Contact Us</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
