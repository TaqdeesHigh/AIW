import { useState, useEffect } from 'react';

export default function useChat({ messagesEndRef, inputRef }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    if (!chatStarted) {
      setChatStarted(true);
    }

    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    setLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a simulated response from AIW. In a real application, this would connect to an actual AI model API. How else can I assist you today?' 
      }]);
      setLoading(false);
    }, 1000);
  };
  
  const startNewChat = () => {
    setChatStarted(false);
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return {
    messages,
    inputValue,
    loading,
    chatStarted,
    setInputValue,
    handleSubmit,
    startNewChat
  };
}