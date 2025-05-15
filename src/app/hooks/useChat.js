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

  const handleSubmit = (e, messageData = null) => {
    e.preventDefault();
    
    if ((!messageData && !inputValue.trim()) || loading) return;
    
    if (!chatStarted) {
      setChatStarted(true);
    }

    let newMessage = {
      role: 'user',
      content: messageData ? messageData.text : inputValue,
      files: messageData ? messageData.files : []
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setLoading(true);
    
    setTimeout(() => {
      let aiResponse = 'This is a simulated response from AIW. In a real application, this would connect to an actual AI model API. How else can I assist you today?';
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        files: []
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
  
  const handleFileUpload = (file) => {
    // It's kept here for backward compatibility
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (!chatStarted) {
        setChatStarted(true);
      }
      
      const isImage = file.type.startsWith('image/');
      
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: `Uploaded: ${file.name}`,
        files: [{
          id: Date.now(),
          name: file.name,
          type: isImage ? 'image' : 'file',
          content: e.target.result
        }]
      }]);
      
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I've received your ${isImage ? 'image' : 'file'}. Let me know if you'd like me to analyze or explain anything about it.`
        }]);
        setLoading(false);
      }, 1000);
    };
    
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  return {
    messages,
    inputValue,
    loading,
    chatStarted,
    setInputValue,
    handleSubmit,
    startNewChat,
    handleFileUpload
  };
}