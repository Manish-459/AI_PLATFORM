import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatBot = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const currentText = text;
    setText(''); // Instantly clear the input box like ChatGPT!
    
    const userMessage = { role: 'user', parts: [{ text: currentText }] };
    const currentHistory = [...messages];
    
    setMessages([...currentHistory, userMessage]);
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:8081/api/v1/openai/chatbot', { 
        text: currentText,
        history: currentHistory 
      });
      
      const aiMessage = { role: 'model', parts: [{ text: data }] };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      // Revert UI state so the user doesn't lose their message on failure!
      setText(currentText);
      setMessages(currentHistory);
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="heading-primary text-gradient" style={{ textAlign: 'center', marginBottom: '8px' }}>AI Chatbot</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>A highly intelligent, context-aware conversational AI.</p>
      
      {/* Scrollable Chat Window */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', marginBottom: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-secondary)', opacity: 0.7 }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>💬</span>
            <p>Start a conversation! I remember what you say.</p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div key={index} className="animate-slide-up" style={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '75%',
                padding: '16px 20px',
                borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
                background: isUser ? 'var(--gradient-glow)' : 'rgba(0,0,0,0.3)',
                border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}>
                <p style={{ color: '#fff', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>
                  {msg.parts[0].text}
                </p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '16px', borderRadius: '20px 20px 20px 0', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="typing-indicator" style={{ padding: 0 }}>
                <div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} style={{ float: 'left', clear: 'both' }} />
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
          <input
            className="input-glass"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ margin: 0, flex: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={loading || !text.trim()} style={{ width: 'auto', padding: '0 32px' }}>
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
