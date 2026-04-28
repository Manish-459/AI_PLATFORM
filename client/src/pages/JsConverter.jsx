import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const JsConverter = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8081/api/v1/openai/js-converter', { text });
      setResult(data);
      toast.success("Converted to JS!");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="heading-primary text-gradient" style={{ textAlign: 'center', marginBottom: '8px' }}>Javascript Converter</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Translate plain English instructions into clean Javascript code.</p>
      
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <form onSubmit={handleSubmit}>
          <textarea
            className="input-glass"
            placeholder="e.g. Write a function to check if a number is prime"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ marginBottom: '16px', resize: 'vertical' }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Converting...' : 'Convert to Code'}
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
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-error)' }}>Javascript Code</h3>
          <pre style={{ background: '#000', padding: '16px', borderRadius: '8px', overflowX: 'auto', color: '#10b981' }}>
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsConverter;
