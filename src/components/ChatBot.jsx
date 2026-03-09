import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('chkon') || lowerMessage.includes('shkoun') || lowerMessage.includes('howa') || lowerMessage.includes('who')) {
      return "**Azzedine Oubaid** is a 21-year-old Full Stack Developer and Cybersecurity enthusiast from Rabat, Morocco. He's currently studying Digital Development at OFPPT and has expertise in modern web technologies like React, Three.js, Laravel, and more. He's passionate about AI, innovation, and building secure, beautiful web applications!";
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('ki3rf') || lowerMessage.includes('kay3rf') || lowerMessage.includes('chno ki3rf') || lowerMessage.includes('idir')) {
      return "Azzedine has a diverse skill set! His main technologies include:\n\n🎨 **Frontend:** HTML, CSS, JavaScript, React, Three.js, GSAP, Framer Motion\n⚙️ **Backend:** PHP, Laravel\n🔧 **DevOps:** Docker, RabbitMQ\n🔒 **Security:** Cybersecurity basics, bug bounty experience\n\nHe's also skilled at using AI tools to accelerate development. Would you like to know more about any specific technology?";
    }

    if (lowerMessage.includes('project')) {
      return "Azzedine has worked on several impressive projects! You can check them out in the **PROJECTS** section of this portfolio. His projects showcase his skills in web development, 3D graphics, and cybersecurity. Some highlights include interactive web applications and security-focused tools. Feel free to explore them!";
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('school') || lowerMessage.includes('ofppt') || lowerMessage.includes('9ra') || lowerMessage.includes('ki9ra') || lowerMessage.includes('fin ki9ra') || lowerMessage.includes('mdrasa') || lowerMessage.includes('ina mdrasa')) {
      return "Azzedine is currently a student in **Digital Development – Full Stack** at OFPPT (Centre Mixte Hay Nahda, Rabat). He's finishing his diploma and has also earned multiple certifications from Cisco NetAcad in Networking, JavaScript, Python, IT Essentials, and Cybersecurity. He's a dedicated learner who's always expanding his knowledge!";
    }

    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return "Azzedine holds several professional certifications:\n\n✅ Bug Bounty Attestation\n✅ Cisco NetAcad Certificates in:\n   • Networking\n   • JavaScript\n   • Python\n   • IT Essentials\n   • Cybersecurity\n\nThese certifications demonstrate his commitment to continuous learning and professional development!";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return "Great! You can reach Azzedine through the **CONTACT** section at the bottom of this page. He's available for:\n\n💼 Job opportunities\n🤝 Collaborations\n💡 Project discussions\n\nFeel free to send him a message at **oubaidazzedine00@gmail.com** or call **+212 631 721 359**. He's always open to new opportunities!";
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('morocco')) {
      return "Azzedine is based in **Rabat, Morocco** 🇲🇦. He's available for both local and remote opportunities!";
    }

    if (lowerMessage.includes('age') || lowerMessage.includes('old')) {
      return "Azzedine is 21 years old and already has impressive experience in web development and cybersecurity!";
    }

    if (lowerMessage.includes('security') || lowerMessage.includes('hacking') || lowerMessage.includes('bug bounty')) {
      return "Azzedine has a strong interest in cybersecurity! He has:\n\n🔒 Bug Bounty Attestation\n🛡️ Cisco Cybersecurity Certification\n🔍 Website security analysis skills\n⚠️ Vulnerability awareness\n\nHe approaches security with an ethical mindset and is passionate about making the web safer.";
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('innovation')) {
      return "Azzedine is passionate about AI and innovation! He uses advanced AI tools and prompts to accelerate website development and create more efficient solutions. He's always exploring new technologies and staying ahead of industry trends. This very chatbot is an example of integrating AI into his portfolio!";
    }

    if (lowerMessage.includes('react') || lowerMessage.includes('frontend') || lowerMessage.includes('three.js')) {
      return "Azzedine is skilled in modern frontend development! He works with:\n\n⚛️ **React** - Building dynamic user interfaces\n🎨 **Three.js** - Creating 3D graphics and animations\n✨ **GSAP & Framer Motion** - Smooth animations\n\nThis portfolio itself is built with React and Three.js, showcasing his frontend expertise!";
    }

    if (lowerMessage.includes('backend') || lowerMessage.includes('php') || lowerMessage.includes('laravel')) {
      return "On the backend, Azzedine works with:\n\n🐘 **PHP** - Server-side programming\n🎯 **Laravel** - Modern PHP framework\n🐳 **Docker** - Containerization\n📨 **RabbitMQ** - Message queuing\n\nHe's a true full-stack developer who can handle both frontend and backend!";
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Azzedine has hands-on experience in:\n\n💻 Full-stack web development\n🎨 3D web graphics and animations\n🔒 Cybersecurity and bug bounty\n🤖 AI-assisted development\n🛠️ Hardware and software troubleshooting\n\nCheck out the **PROJECTS** section to see his work in action, or visit the **EXPERIENCE** section for more details!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn about Azzedine Oubaid. You can ask me about his skills, projects, education, or how to contact him. What would you like to know?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! 😊 If you have any more questions about Azzedine or would like to get in touch with him, feel free to ask!";
    }

    return "I'm here to help you learn about Azzedine Oubaid! You can ask me about:\n\n💡 His skills and technologies\n📁 His projects\n🎓 His education and certifications\n📧 How to contact him\n🔒 His cybersecurity experience\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const assistantMessage = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);
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
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full flex items-center justify-center z-[9999] border-2 cursor-pointer text-white text-3xl"
        style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderColor: 'rgba(239, 68, 68, 0.5)',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)'
        }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-28 right-[180px] w-[440px] h-[680px] rounded-2xl overflow-hidden z-[9998] flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 10, 0.95) 0%, rgba(30, 10, 15, 0.95) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 80px rgba(239, 68, 68, 0.3), inset 0 0 60px rgba(239, 68, 68, 0.05)'
            }}
          >
            {/* Header */}
            <div 
              className="px-6 py-5 border-b relative"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(239, 68, 68, 0.2)'
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.6)'
                  }}
                >
                  <HiSparkles className="text-white text-xl" />
                </motion.div>
                <h2 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #dc2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
                  }}
                >
                  AI Assistant
                </h2>
              </div>
              <p className="text-center text-sm text-gray-400">
                Ask anything about Azzedine
              </p>
              <div 
                className="absolute inset-0 blur-xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)'
                }}
              />
            </div>

            {/* Messages Container */}
            <div 
              className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(239, 68, 68, 0.5) transparent'
              }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white'
                        : 'text-gray-100'
                    }`}
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
                          }
                        : {
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }
                    }
                  >
                    <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div 
                    className="rounded-2xl px-4 py-3 flex gap-1.5"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15
                        }}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div 
              className="p-4 border-t"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(239, 68, 68, 0.2)'
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-5 py-3.5 rounded-full text-white text-sm placeholder-gray-500 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15), 0 0 20px rgba(239, 68, 68, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                  style={
                    input.trim()
                      ? {
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)',
                          cursor: 'pointer'
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.05)',
                          cursor: 'not-allowed',
                          opacity: 0.5
                        }
                  }
                >
                  <FaPaperPlane className="text-white text-lg" style={{ marginLeft: '2px' }} />
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
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </>
  );
};

export default ChatBot;
