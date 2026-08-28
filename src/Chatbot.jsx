import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';

const faqs = [
  {
    question: "Where is Pure Diamond ECD located?",
    answer: "Pure Diamond ECD Community Based is located in Bugesera District, Gashora Sector, Ramiro Cell, Rweru.."
  },
  {
    question: "How much are the school fees?",
    answer: "The school fees are 35,000 Frw."
  },
  {
    question: "What school materials does my child need?",
    answer: "The required materials listed by the school are: 6 notebooks — 5 lined, well-covered 96-page notebooks + 1 drawing notebook, 2 crayons / pencils / wooden pencils, 3 hygiene paper items, 1 rubber/eraser, 1 school bag, 2 files with metal fasteners, 1 ream of paper These requirements are listed in the school's required-materials section."
  },
  {
    question: "Is there a uniform?",
    answer: "Yes, we have a school uniform. Details will be provided upon enrollment."
  }
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          text: "👋 Hello! I'm here to help. Feel free to ask me anything about Pure Diamond ECD School!"
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setShowSuggestions(false);

    // Find matching FAQ
    setTimeout(() => {
      const matched = faqs.find(faq =>
        faq.question.toLowerCase().includes(userMessage.toLowerCase()) ||
        userMessage.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))
      );

      let botResponse;
      if (matched) {
        botResponse = matched.answer;
      } else {
        botResponse = "I'm not sure about that. Please contact us directly or send an email to info@purediamond.com for more specific information. 📧";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <button className="chatbot-toggle" onClick={toggleChat}>
        <MessageCircle size={24} />
        <span className="chatbot-badge">FAQ</span>
      </button>
    );
  }

  return (
    <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header">
        <div className="chatbot-header-content">
          <div className="chatbot-avatar">
            <MessageCircle size={20} />
          </div>
          <div>
            <h4>Pure Diamond Assistant</h4>
            <span>Online • Usually replies instantly</span>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <button onClick={toggleMinimize} className="chatbot-minimize">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={toggleChat} className="chatbot-close">
            <X size={20} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.type}`}>
                <div className="chatbot-message-content">
                  {msg.text}
                </div>
              </div>
            ))}
            {showSuggestions && messages.length === 1 && (
              <div className="chatbot-suggestions">
                <p className="suggestion-label">Common questions:</p>
                <div className="suggestion-chips">
                  {faqs.slice(0, 4).map((faq, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSend(faq.question)}
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="chatbot-input"
            />
            <button
              onClick={() => handleSend()}
              className="chatbot-send"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chatbot;
