import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TextSummary = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8081/api/v1/openai/summary', { text });
      setSummary(data);
      toast.success("Summary Generated");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="heading-primary text-gradient" style={{ textAlign: 'center', marginBottom: '8px' }}>Text Summarization</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Copy and paste a long article to get a concise summary.</p>
      
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <form onSubmit={handleSubmit}>
          <textarea
            className="input-glass"
            placeholder="Paste your long text here..."
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ marginBottom: '16px', resize: 'vertical' }}
          ></textarea>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Generating...' : 'Summarize Text'}
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

      {!loading && summary && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>AI Summary</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummary;
