import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';

const faqs = [
  {
    question: "What are the school hours?",
    answer: "Our school operates from 7:30 AM to 4:00 PM, Monday through Friday."
  },
  {
    question: "What is the age range for enrollment?",
    answer: "We accept children ages 2 to 6 years old for our Nursery 1, 2, and 3 programs."
  },
  {
    question: "Do you provide meals?",
    answer: "Yes, we provide nutritious meals and snacks throughout the day."
  },
  {
    question: "What is the admission process?",
    answer: "Contact us to schedule a visit, fill out the application form, and complete the enrollment registration."
  },
  {
    question: "What languages are taught?",
    answer: "We teach both English and French, with play-based learning activities in both languages."
  },
  {
    question: "Is there a uniform?",
    answer: "Yes, we have a school uniform. Details will be provided upon enrollment."
  },
  {
    question: "What is the student-teacher ratio?",
    answer: "We maintain a small class size with a ratio of approximately 10:1 for personalized attention."
  },
  {
    question: "Do you have after-school care?",
    answer: "Yes, we offer extended care options. Please contact us for more details."
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