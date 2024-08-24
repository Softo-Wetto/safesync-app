import React from 'react';
import './Contact.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <h2>Get in Touch</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="5" placeholder="Your Message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-map-marker-alt fa-3x"></i>
                            <h4>Our Office</h4>
                            <p>123 Safety Lane, Secure City, SC 45678</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-phone fa-3x"></i>
                            <h4>Call Us</h4>
                            <p>+1 234 567 890</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-envelope fa-3x"></i>
                            <h4>Email Us</h4>
                            <p>support@safesync.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container-fluid p-0">
                    <iframe
                        title="Safesync Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13590.813187534379!2d153.11939855258328!3d-27.59906881991317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915b4fdc5146ad%3A0x502a35af3de96f0!2sRochedale%20South%20QLD%204123%2C%20Australia!5e1!3m2!1sen!2sus!4v1724512355253!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
