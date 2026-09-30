import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import SEO from '../../../components/SEO';
import DetailedFooter from '../../../components/DetailedFooter';
import { careerMaterials } from '../materials';
import './CareerChoiceMaterialsPage.css';

const CareerChoiceMaterialsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="materials-page sc-subpage">
            <SEO 
                title="Career Choice Materials | EvolvEd Academy"
                description="Explore resources, guides, and materials to help you make informed career decisions."
            />
            
            <div className="container materials-container">
                <button className="back-btn" onClick={() => navigate('/career-counselling/course')}>
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <div className="materials-header">
                    <h1>Career Choice Materials</h1>
                    <p>Browse through our curated collection of resources to guide your career path.</p>
                </div>

                <div className="materials-grid">
                    {careerMaterials.map((material) => (
                        <div key={material.id} className="material-card">
                            <div className="material-thumbnail">
                                <img src={material.thumbnail} alt={material.title} />
                                <div className="material-overlay">
                                    <a href={material.link} className="download-btn" target="_blank" rel="noopener noreferrer">
                                        <Download size={20} /> View Material
                                    </a>
                                </div>
                            </div>
                            <div className="material-info">
                                <div className="material-icon">
                                    <FileText size={20} />
                                </div>
                                <h3 className="material-title">{material.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DetailedFooter />
        </div>
    );
};

export default CareerChoiceMaterialsPage;
