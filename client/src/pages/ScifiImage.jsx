import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ScifiImage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8081/api/v1/openai/scifi-image', { text });
      setImage(data.url);
      toast.success("Image Generated");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="heading-primary text-gradient" style={{ textAlign: 'center', marginBottom: '8px' }}>Sci-Fi Image Gen</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Generate stunning Sci-Fi artwork from your prompts.</p>
      
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <form onSubmit={handleSubmit}>
          <input
            className="input-glass"
            placeholder="e.g. A futuristic cyberpunk city at night"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ marginBottom: '16px' }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Visualizing...' : 'Generate Art'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
          <div className="typing-indicator">
            <div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div>
          </div>
        </div>
      )}

      {!loading && image && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '16px', color: '#eab308' }}>Generated Artwork</h3>
          <img src={image} alt="Sci-Fi Generated" style={{ maxWidth: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      )}
    </div>
  );
};

export default ScifiImage;
