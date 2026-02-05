import React from 'react';
import PromptCarousel from '../components/PromptCarousel';

const AIPromptsPage = () => {
    const prompts = [
        {
            resultTitle: 'Futuristic Eco City',
            promptText: 'A futuristic eco-friendly city with vertical gardens, flying cars, and golden sunlight, photorealistic 8k',
            resultColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
        },
        {
            resultTitle: 'Cyberpunk Robot Artist',
            promptText: 'A friendly robot painting on a canvas in a sunlit studio, digital art style, vibrant colors',
            resultColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            resultTitle: 'Deep Sea Exploration',
            promptText: 'Bioluminescent creatures in a deep underwater trench, mystical atmosphere, 4k render',
            resultColor: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
        },
        {
            resultTitle: 'Abstract Data Flow',
            promptText: 'Abstract representation of data streaming through a neural network, glowing nodes, dark background',
            resultColor: 'linear-gradient(135deg, #232526 0%, #414345 100%)'
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>AI Prompts Gallery</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                    Discover the magic behind the images. Toggle to see the prompt!
                </p>
            </div>

            <div className="course-grid">
                {prompts.map((item, index) => (
                    <PromptCarousel
                        key={index}
                        resultTitle={item.resultTitle}
                        promptText={item.promptText}
                        resultColor={item.resultColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default AIPromptsPage;
