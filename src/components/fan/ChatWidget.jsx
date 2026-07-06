import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe2, Sparkles } from 'lucide-react';
import { getGeminiChatResponse } from '../../services/gemini';
import { useData } from '../../data/DataContext';
import './ChatWidget.css';

const ChatWidget = () => {
  const { waitTimes, capacity } = useData();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Welcome to FIFA Nexus! How can I assist you with your match day experience? (Try asking about wait times or finding your seat)" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Call Gemini API
    const responseText = await getGeminiChatResponse(userText, { waitTimes, capacity });
    
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
          <Globe2 size={16} /> Multi-lingual AI
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

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about queues, navigation, or transit..." 
        />
        <button type="submit" disabled={!input.trim()} className="send-btn">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
