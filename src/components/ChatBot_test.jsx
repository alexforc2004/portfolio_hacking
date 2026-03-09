import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const ChatBot = ({ isPlaylistOpen, theme = 'cyber' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6';
  const secondaryColor = theme === 'cyber' ? '#990000' : '#06b6d4';
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your AI assistant. Ask me anything about Azzedine's skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('chkon') || lowerMessage.includes('shkoun') || lowerMessage.includes('howa') || lowerMessage.includes('who')) {
      return "**Azzedine Oubaid** is a 21-year-old Full Stack Developer and Cybersecurity enthusiast from Rabat, Morocco. He's currently studying Digital Development at OFPPT and has expertise in modern web technologies like React, Three.js, Laravel, and more!";
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('ki3rf') || lowerMessage.includes('idir')) {
      return "Azzedine has a diverse skill set! His main technologies include:\n\n🎨 **Frontend:** HTML, CSS, JavaScript, React, Three.js, GSAP, Framer Motion\n⚙️ **Backend:** PHP, Laravel\n🔧 **DevOps:** Docker, RabbitMQ\n🔒 **Security:** Cybersecurity basics, bug bounty experience";
    }

    if (lowerMessage.includes('project')) {
      return "Azzedine has worked on several impressive projects! You can check them out in the **PROJECTS** section of this portfolio. His projects showcase his skills in web development, 3D graphics, and cybersecurity.";
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('9ra') || lowerMessage.includes('ki9ra') || lowerMessage.includes('mdrasa')) {
      return "Azzedine is currently a student in **Digital Development – Full Stack** at OFPPT (Centre Mixte Hay Nahda, Rabat). He's finishing his diploma and has also earned multiple certifications from Cisco NetAcad!";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach Azzedine at:\n\n📧 **Email:** oubaidazzedine00@gmail.com\n📱 **Phone:** +212 631 721 359\n\nFeel free to get in touch!";
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('fin')) {
      return "Azzedine is based in **Rabat, Morocco** 🇲🇦";
    }

    return "I'm here to help you learn about Azzedine! You can ask me about his skills, projects, education, certifications, or how to contact him. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: getAIResponse(input) };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Bottom Left */}
      {!isPlaylistOpen && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: theme === 'cyber' 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            border: theme === 'cyber' 
              ? '2px solid rgba(239, 68, 68, 0.5)'
              : '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: theme === 'cyber'
              ? '0 8px 32px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)'
              : '0 8px 32px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '28px'
          }}
        >
          {isOpen ? <FaTimes /> : <HiSparkles />}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '110px',
              left: '30px',
              width: '400px',
              height: '500px',
              borderRadius: '20px',
              background: 'rgba(10, 10, 15, 0.4)',
              backdropFilter: 'blur(40px)',
              border: theme === 'cyber' 
                ? '1px solid rgba(239, 68, 68, 0.3)'
                : '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: theme === 'cyber'
                ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(239, 68, 68, 0.2)'
                : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(59, 130, 246, 0.2)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px',
              borderBottom: theme === 'cyber' 
                ? '1px solid rgba(239, 68, 68, 0.2)'
                : '1px solid rgba(59, 130, 246, 0.2)',
              background: theme === 'cyber'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '24px' }}
                >
                  <HiSparkles style={{ color: theme === 'cyber' ? '#ef4444' : '#3b82f6' }} />
                </motion.div>
                <h3 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: theme === 'cyber'
                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  AI ASSISTANT
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Ask anything about Azzedine
              </p>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: msg.role === 'user' 
                      ? (theme === 'cyber' 
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)')
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: theme === 'cyber' ? '#ef4444' : '#3b82f6'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '20px',
              borderTop: theme === 'cyber' 
                ? '1px solid rgba(239, 68, 68, 0.2)'
                : '1px solid rgba(59, 130, 246, 0.2)',
              background: 'rgba(10, 10, 15, 0.6)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(239, 68, 68, 0.5)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: input.trim() 
                      ? (theme === 'cyber'
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)')
                      : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    opacity: input.trim() ? 1 : 0.5
                  }}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
