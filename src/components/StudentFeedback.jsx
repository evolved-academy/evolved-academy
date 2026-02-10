import React from 'react';
import './StudentFeedback.css';

const StudentFeedback = () => {
    return (
        <div className="student-feedback-container">
            <div className="feedback-header">
                <h2 className="feedback-title">
                    Upskillers <span className="heart-icon">❤️</span> EvolvEd Academy
                </h2>
                <p className="feedback-subtitle">Hear from our students</p>
            </div>

            {/* Featured Testimonial */}
            <div className="featured-feedback-card">

                <div className="feedback-content">
                    <div className="quote-icon">❝</div>
                    <p className="feedback-text">
                        "I easily Learnt uses of AI in studies and creativity , and public speaking (also reading) and a lil bit of coding. I did'nt felt like you were our teacher , I felt like you were our elder brothers teaching us and giving us advice for our bright future and confidence."
                    </p>
                    <div className="student-info">
                        <h4>Student</h4>
                        <p>5 Day AI Bootcamp</p>
                    </div>
                </div>
            </div>

            {/* Smaller Grid Cards */}
            <div className="feedback-grid">
                <div className="feedback-card-small">
                    <div className="small-quote-icon">❝</div>
                    <p className="feedback-text">
                        "Actually the ai bootcamp was beneficial for me and also it has taught something new in my life which would help me further in my studies. Also the explanation by Taher and keshav sir was amazing"
                    </p>
                    <div className="student-info">
                        <h4>Student</h4>
                        <p>5 Day AI Bootcamp</p>
                    </div>
                </div>
                <div className="feedback-card-small">
                    <div className="small-quote-icon">❝</div>
                    <p className="feedback-text">
                        "The teaching was really awesome. I enjoyed learning about ai tools and uses of Ai for creativity. I really understood the basic coding and MS excel. I will surely attend other camps of EvolvEd."
                    </p>
                    <div className="student-info">
                        <h4>Student</h4>
                        <p>5 Day AI Bootcamp</p>
                    </div>
                </div>
                <div className="feedback-card-small">
                    <div className="small-quote-icon">❝</div>
                    <p className="feedback-text">
                        "Thank you so much to both. you both taught us very well,you solved all our doubts and made us clear about all the topics. I really loves all the courses and really enjoyed learning them. Once again thankyou!!💖"
                    </p>
                    <div className="student-info">
                        <h4>Student</h4>
                        <p>5 Day AI Bootcamp</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentFeedback;
