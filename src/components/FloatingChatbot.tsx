import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatContext {
  vehicle?: {
    make: string;
    model: string;
    year: number;
    engine?: string;
    type?: string;
  };
  obdCode?: {
    code: string;
    meaning: string;
    possible_causes?: string[];
  };
}

interface FloatingChatbotProps {
  context?: ChatContext;
}

const FloatingChatbot = ({ context }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('autobots_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    } else {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        role: 'assistant',
        content: "Hello! I'm your AutoBots AI assistant, an expert automotive mechanic. I can help you with vehicle diagnostics, repair guidance, OBD code explanations, and maintenance advice. How can I assist you today?",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('autobots_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          context
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please make sure the backend server is running and try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    const welcomeMessage: Message = {
      role: 'assistant',
      content: "Chat history cleared. How can I help you today?",
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem('autobots_chat_history');
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[480px] max-w-[calc(100vw-3rem)] bg-card border-2 border-primary/30 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary to-secondary/80 p-4 flex items-center justify-between border-b border-primary/20">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <Bot className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-rajdhani font-bold text-foreground">AI Mechanic Assistant</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Powered by Groq AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={clearHistory}
                  className="hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                  title="Clear chat history"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Context Display */}
            {context && (
              <div className="bg-primary/10 p-3 border-b border-primary/20">
                <p className="text-xs font-rajdhani font-semibold text-primary mb-1">Current Context:</p>
                {context.vehicle && (
                  <p className="text-xs text-muted-foreground">
                    🚗 {context.vehicle.year} {context.vehicle.make} {context.vehicle.model}
                  </p>
                )}
                {context.obdCode && (
                  <p className="text-xs text-muted-foreground">
                    🔧 Code: {context.obdCode.code} - {context.obdCode.meaning}
                  </p>
                )}
              </div>
            )}

            {/* Messages */}
            <div className="h-[450px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-secondary/20">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.role === "user" ? "order-2" : "order-1"}`}>
                    <div className={`p-3 rounded-2xl shadow-lg ${
                      msg.role === "user" 
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-sm" 
                        : "bg-card border border-border text-foreground rounded-tl-sm"
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 px-2 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm shadow-lg">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-gradient-to-r from-card/50 to-secondary/30 backdrop-blur-sm">
              <div className="flex gap-3 items-end">
                <Textarea 
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about repairs, diagnostics, or codes..."
                  className="flex-1 min-h-[48px] max-h-32 resize-none bg-background/95 border-primary/20 focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 font-rajdhani scrollbar-hide"
                  rows={1}
                  disabled={isLoading}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                />
                <Button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 h-12 w-12 rounded-xl shadow-lg disabled:shadow-none transition-all duration-300"
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-xs text-muted-foreground/80 font-rajdhani">
                  💡 Your AI automotive expert
                </p>
                <p className="text-xs text-muted-foreground/60 font-rajdhani">
                  Enter to send • Shift+Enter new line
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center z-50 animate-glow-pulse"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-primary-foreground" />
        ) : (
          <Bot className="w-7 h-7 text-primary-foreground" />
        )}
      </motion.button>
    </>
  );
};

export default FloatingChatbot;
