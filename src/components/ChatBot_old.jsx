import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm Alex, Azzedine's AI assistant. Ask me anything about his skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are the AI assistant of the personal portfolio website of **Azzedine Oubaid**.

Your role is to help visitors understand who Azzedine is, what skills he has, and what projects he works on.
Answer in a clear, professional, and friendly way.

Information about Azzedine:

Name: Azzedine Oubaid
Age: 21
Location: Rabat, Morocco

Education:
Student in Digital Development – Full Stack at OFPPT (Centre Mixte Hay Nahda, Rabat).
Currently finishing his diploma.

Main Skills:
* HTML
* CSS
* JavaScript
* React
* PHP
* Laravel
* Three.js
* GSAP
* Framer Motion
* Docker
* RabbitMQ

Other Expertise:
* Building modern websites and web applications
* Using AI tools and advanced prompts to create websites faster
* Basic cybersecurity knowledge (ethical / grey hat mindset)
* Website security analysis and vulnerability awareness
* Basic hardware and software troubleshooting

Certifications:
* Bug Bounty Attestation
* Cisco NetAcad Certificates in:
  * Networking
  * JavaScript
  * Python
  * IT Essentials
  * Cybersecurity

Personality:
Azzedine is passionate about technology, innovation, AI, and cybersecurity.
He is self-taught in many areas and always learning new tools and technologies.

Your tasks as the AI assistant:
1. Answer questions about Azzedine's skills, projects, and background.
2. Help visitors understand his technologies and expertise.
3. Guide visitors to sections of the portfolio (projects, contact, skills).
4. Encourage potential employers or collaborators to contact him.
5. Keep answers concise, helpful, and professional.

If someone asks something unrelated to the portfolio, politely redirect the conversation back to Azzedine's work or skills.

Always represent Azzedine in a professional and positive way.`;

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Who is Azzedine (Moroccan Arabic)
    if (lowerMessage.includes('chkon') || lowerMessage.includes('shkoun') || lowerMessage.includes('howa') || lowerMessage.includes('who')) {
      return "**Azzedine Oubaid** is a 21-year-old Full Stack Developer and Cybersecurity enthusiast from Rabat, Morocco. He's currently studying Digital Development at OFPPT and has expertise in modern web technologies like React, Three.js, Laravel, and more. He's passionate about AI, innovation, and building secure, beautiful web applications!";
    }

    // Skills-related responses (including Moroccan Arabic)
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('ki3rf') || lowerMessage.includes('kay3rf') || lowerMessage.includes('chno ki3rf') || lowerMessage.includes('idir')) {
      return "Azzedine has a diverse skill set! His main technologies include:\n\n🎨 **Frontend:** HTML, CSS, JavaScript, React, Three.js, GSAP, Framer Motion\n⚙️ **Backend:** PHP, Laravel\n🔧 **DevOps:** Docker, RabbitMQ\n🔒 **Security:** Cybersecurity basics, bug bounty experience\n\nHe's also skilled at using AI tools to accelerate development. Would you like to know more about any specific technology?";
    }

    // Projects-related responses
    if (lowerMessage.includes('project')) {
      return "Azzedine has worked on several impressive projects! You can check them out in the **PROJECTS** section of this portfolio. His projects showcase his skills in web development, 3D graphics, and cybersecurity. Some highlights include interactive web applications and security-focused tools. Feel free to explore them!";
    }

    // Education-related responses (including Moroccan Arabic)
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('school') || lowerMessage.includes('ofppt') || lowerMessage.includes('9ra') || lowerMessage.includes('ki9ra') || lowerMessage.includes('fin ki9ra') || lowerMessage.includes('mdrasa') || lowerMessage.includes('ina mdrasa')) {
      return "Azzedine is currently a student in **Digital Development – Full Stack** at OFPPT (Centre Mixte Hay Nahda, Rabat). He's finishing his diploma and has also earned multiple certifications from Cisco NetAcad in Networking, JavaScript, Python, IT Essentials, and Cybersecurity. He's a dedicated learner who's always expanding his knowledge!";
    }

    // Certifications
    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return "Azzedine holds several professional certifications:\n\n✅ Bug Bounty Attestation\n✅ Cisco NetAcad Certificates in:\n   • Networking\n   • JavaScript\n   • Python\n   • IT Essentials\n   • Cybersecurity\n\nThese certifications demonstrate his commitment to continuous learning and professional development!";
    }

    // Contact-related responses
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return "Great! You can reach Azzedine through the **CONTACT** section at the bottom of this page. He's available for:\n\n💼 Job opportunities\n🤝 Collaborations\n💡 Project discussions\n\nFeel free to send him a message at **oubaidazzedine00@gmail.com** or call **+212 631 721 359**. He's always open to new opportunities!";
    }

    // Location
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('morocco')) {
      return "Azzedine is based in **Rabat, Morocco** 🇲🇦. He's available for both local and remote opportunities!";
    }

    // Age
    if (lowerMessage.includes('age') || lowerMessage.includes('old')) {
      return "Azzedine is 21 years old and already has impressive experience in web development and cybersecurity!";
    }

    // Cybersecurity
    if (lowerMessage.includes('security') || lowerMessage.includes('hacking') || lowerMessage.includes('bug bounty')) {
      return "Azzedine has a strong interest in cybersecurity! He has:\n\n🔒 Bug Bounty Attestation\n🛡️ Cisco Cybersecurity Certification\n🔍 Website security analysis skills\n⚠️ Vulnerability awareness\n\nHe approaches security with an ethical mindset and is passionate about making the web safer.";
    }

    // AI/Innovation
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('innovation')) {
      return "Azzedine is passionate about AI and innovation! He uses advanced AI tools and prompts to accelerate website development and create more efficient solutions. He's always exploring new technologies and staying ahead of industry trends. This very chatbot is an example of integrating AI into his portfolio!";
    }

    // React/Frontend
    if (lowerMessage.includes('react') || lowerMessage.includes('frontend') || lowerMessage.includes('three.js')) {
      return "Azzedine is skilled in modern frontend development! He works with:\n\n⚛️ **React** - Building dynamic user interfaces\n🎨 **Three.js** - Creating 3D graphics and animations\n✨ **GSAP & Framer Motion** - Smooth animations\n\nThis portfolio itself is built with React and Three.js, showcasing his frontend expertise!";
    }

    // Backend
    if (lowerMessage.includes('backend') || lowerMessage.includes('php') || lowerMessage.includes('laravel')) {
      return "On the backend, Azzedine works with:\n\n🐘 **PHP** - Server-side programming\n🎯 **Laravel** - Modern PHP framework\n🐳 **Docker** - Containerization\n📨 **RabbitMQ** - Message queuing\n\nHe's a true full-stack developer who can handle both frontend and backend!";
    }

    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Azzedine has hands-on experience in:\n\n💻 Full-stack web development\n🎨 3D web graphics and animations\n🔒 Cybersecurity and bug bounty\n🤖 AI-assisted development\n🛠️ Hardware and software troubleshooting\n\nCheck out the **PROJECTS** section to see his work in action, or visit the **EXPERIENCE** section for more details!";
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn about Azzedine Oubaid. You can ask me about his skills, projects, education, or how to contact him. What would you like to know?";
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! 😊 If you have any more questions about Azzedine or would like to get in touch with him, feel free to ask!";
    }

    // Default response
    return "I'm here to help you learn about Azzedine Oubaid! You can ask me about:\n\n💡 His skills and technologies\n📁 His projects\n🎓 His education and certifications\n📧 How to contact him\n🔒 His cybersecurity experience\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '120px',
          zIndex: 9999,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          cursor: 'pointer',
          border: 'none'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaRobot size={28} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '110px',
              right: '32px',
              zIndex: 9998,
              width: '440px',
              height: '680px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(10, 10, 15, 0.3)',
              backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(80px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 120px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div 
              className="p-6 border-b"
              style={{
                background: 'rgba(15, 15, 25, 0.4)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="text-center">
                <motion.h3 
                  className="text-white font-bold"
                  style={{
                    fontSize: '32px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.5px'
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  AI Assistant
                </motion.h3>
                <p className="text-gray-400 text-sm mt-2">Ask anything about Azzedine</p>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="overflow-y-auto px-4 py-6"
              style={{ 
                height: 'calc(100% - 190px)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(102, 126, 234, 0.5) transparent'
              }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="mb-6"
                >
                  {msg.role === 'assistant' && (
                    <div className="flex justify-center mb-2">
                      <div className="max-w-[90%]">
                        <div className="text-xs text-gray-400 mb-1.5 font-medium text-center">AI Assistant</div>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <p className="text-white text-[15px] leading-relaxed text-center" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="flex justify-center mb-2">
                      <div className="max-w-[90%]">
                        <div className="text-xs text-gray-400 mb-1.5 font-medium text-center">You</div>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)'
                          }}
                        >
                          <p className="text-white text-[15px] leading-relaxed text-center" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div 
                    className="p-4 rounded-2xl rounded-bl-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex gap-1.5">
                      <motion.span 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - At Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-6 border-t"
              style={{
                background: 'rgba(15, 15, 25, 0.95)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message AI Assistant..."
                    className="w-full text-white px-6 py-4 rounded-full focus:outline-none transition-all"
                    style={{
                      fontSize: '16px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.6)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: input.trim() 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: input.trim() 
                      ? '0 4px 20px rgba(102, 126, 234, 0.5)'
                      : 'none',
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    opacity: input.trim() ? 1 : 0.5
                  }}
                >
                  <FaPaperPlane size={18} className="text-white" style={{ marginLeft: '2px' }} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Custom Scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.7);
        }
      `}</style>
    </>
  );
};

export default ChatBot;
