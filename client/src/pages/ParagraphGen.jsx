import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ParagraphGen = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8081/api/v1/openai/paragraph', { text });
      setResult(data);
      toast.success("Paragraph Generated");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="heading-primary text-gradient" style={{ textAlign: 'center', marginBottom: '8px' }}>Paragraph Generator</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Enter keywords and let AI write a rich paragraph for you.</p>
      
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <form onSubmit={handleSubmit}>
          <input
            className="input-glass"
            placeholder="e.g. Technology, Future, Space Travel"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ marginBottom: '16px' }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Paragraph'}
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

      {!loading && result && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-secondary)' }}>AI Paragraph</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ParagraphGen;
