import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { getGeminiChatResponse } from '../../services/gemini';
import { useData } from '../../data/DataContext';
import './ChatWidget.css';

const ChatWidget = () => {
  const { waitTimes, capacity } = useData();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Welcome to FIFA Nexus! How can I assist you with your match day experience? (Try asking about wait times, or click the image icon to scan your ticket!)" }
  ]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const userText = input || "I uploaded an image.";
    const userMsg = { id: Date.now(), sender: 'user', text: userText + (selectedFile ? ` [Attached: ${selectedFile.name}]` : '') };
    setMessages(prev => [...prev, userMsg]);
    
    const currentFile = selectedFile;
    setInput('');
    setSelectedFile(null);
    setIsTyping(true);

    // Call Gemini API with vision support
    const responseText = await getGeminiChatResponse(userText, { waitTimes, capacity }, currentFile);
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      sender: 'ai', 
      text: responseText
    }]);
    setIsTyping(false);
  };

  return (
    <div className="chat-widget glass-panel">
      <div className="chat-header">
        <div className="chat-title">
          <Bot size={24} color="var(--accent-teal)" />
          <h3>Nexus Assistant <Sparkles size={14} color="#00ffaa" style={{marginLeft: '4px'}}/></h3>
        </div>
        <div className="lang-indicator">
          <Globe2 size={16} /> Vision + AI
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="msg-avatar">
              {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="msg-content">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message ai typing">
            <div className="msg-avatar"><Bot size={16} /></div>
            <div className="msg-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          style={{ background: 'none', border: 'none', color: selectedFile ? 'var(--accent-teal)' : 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
          title="Upload Ticket Image"
        >
          <ImageIcon size={20} />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or scan a ticket..." 
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
        />
        <button type="submit" disabled={!input.trim() && !selectedFile} className="send-btn" style={{ padding: '0.8rem', borderRadius: '8px', background: 'var(--accent-teal)', color: '#000', border: 'none', cursor: 'pointer' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
