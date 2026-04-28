import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCardText, BsChatDots, BsCodeSlash, BsImage, BsLayoutTextWindow } from 'react-icons/bs';

const tools = [
  {
    name: 'Text Summary',
    desc: 'Summarize long articles into concise sentences.',
    icon: <BsCardText size={32} color="var(--accent-primary)" />,
    path: '/summary'
  },
  {
    name: 'Paragraph Generator',
    desc: 'Generate rich paragraphs from a few keywords.',
    icon: <BsLayoutTextWindow size={32} color="var(--accent-secondary)" />,
    path: '/paragraph'
  },
  {
    name: 'AI ChatBot',
    desc: 'Have a fluid conversation with our AI assistant.',
    icon: <BsChatDots size={32} color="var(--accent-success)" />,
    path: '/chatbot'
  },
  {
    name: 'JS Converter',
    desc: 'Translate natural language directly into JS Code.',
    icon: <BsCodeSlash size={32} color="var(--accent-error)" />,
    path: '/js-converter'
  },
  {
    name: 'Sci-Fi Image Gen',
    desc: 'Generate stunning Sci-Fi artwork on demand.',
    icon: <BsImage size={32} color="#eab308" />,
    path: '/scifi-image'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("authToken"));
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 className="heading-primary text-gradient">AI Toolkit Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Select a powerful AI tool to begin your journey.</p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {tools.map((tool, index) => (
          <div 
            key={index} 
            className="glass-card-interactive animate-slide-up"
            onClick={() => navigate(tool.path)}
            style={{ 
              flex: '1 1 300px', 
              maxWidth: '320px',
              animationDelay: `${index * 0.1}s` 
            }}
          >
            <div style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.05)', display: 'inline-block', padding: '16px', borderRadius: '14px' }}>
              {tool.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>{tool.name}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
