import React from 'react';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';
import './LegalPage.css';

const LegalPage = () => {
    return (
        <div className="legal-page">
            <SEO title="Legal | Privacy Policy & Terms of Service" />
            <div className="container legal-container">
                <div className="legal-content">
                    <section className="legal-section">
                        <h1>Privacy Policy</h1>
                        <p className="last-updated">Last Updated: April 2026</p>
                        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your data.</p>

                        <h3>1. Information We Collect</h3>
                        <p><strong>Personal Data:</strong> Name, email address, and billing information provided during registration.</p>
                        <p><strong>Usage Data:</strong> Information on how you interact with our platform (e.g., course progress, quiz scores).</p>
                        <p><strong>Payment Information:</strong> We use third-party payment processors. We do not store your full credit card or bank details on our servers.</p>

                        <h3>2. How We Use Your Information</h3>
                        <ul>
                            <li>To deliver and manage your course access.</li>
                            <li>To send important updates regarding your classes or technical support.</li>
                            <li>To improve our curriculum based on student performance data.</li>
                        </ul>

                        <h3>3. Data Security</h3>
                        <p>We implement industry-standard security measures, including encryption and secure socket layers (SSL), to protect your personal information from unauthorized access.</p>

                        <h3>4. Third-Party Sharing</h3>
                        <p>We do not sell your personal data. We only share information with essential service providers (like hosting platforms or email services) necessary to operate the academy.</p>

                        <h3>5. Your Rights</h3>
                        <p>You have the right to request access to the data we hold about you or ask for its deletion. For any privacy-related inquiries, please contact our support team.</p>
                    </section>

                    <hr className="legal-divider" />

                    <section className="legal-section">
                        <h1>Terms and Conditions</h1>
                        <p className="last-updated">Last Updated: April 2026</p>
                        <p>Welcome to EvolvEd Academy. By accessing our website and purchasing our courses, you agree to comply with and be bound by the following terms.</p>

                        <h3>1. Services Provided</h3>
                        <p>EvolvEd Academy provides educational content through live sessions and recorded modules. We reserve the right to modify, update, or discontinue any course or content at our discretion without prior notice.</p>

                        <h3>2. User Accounts</h3>
                        <ul>
                            <li>You must provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>Accounts are for individual use only. Sharing account access with third parties is strictly prohibited and may result in account termination without a refund.</li>
                        </ul>

                        <h3>3. Intellectual Property</h3>
                        <p>All materials, including video lessons, PDFs, prompts, and curriculum structures, are the intellectual property of EvolvEd Academy.</p>
                        <p><strong>Grant of License:</strong> You are granted a limited, non-exclusive license to view the content for personal educational purposes.</p>
                        <p><strong>Prohibitions:</strong> You may not record, download (unless permitted), redistribute, or sell any part of our course content.</p>

                        <h3>4. Payments and Refunds</h3>
                        <p><strong>Pricing:</strong> All fees are clearly stated at the time of purchase. We reserve the right to change prices at any time.</p>
                        <p><strong>Refund Policy:</strong> Due to the digital nature of our recorded content, refunds are typically not provided once the course has been accessed. For live sessions, refund requests must be submitted at least 48 hours before the start date.</p>

                        <h3>5. Limitation of Liability</h3>
                        <p>EvolvEd Academy provides tools and knowledge "as is." While we strive for excellence, we do not guarantee specific career outcomes or financial gains as a result of taking our courses.</p>
                    </section>
                </div>
            </div>
            <DetailedFooter />
        </div>
    );
};

export default LegalPage;
