'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import styles from './page.module.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputForm from './components/InputForm';
import WelcomeScreen from './components/WelcomeScreen';
import useChat from './hooks/useChat';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const { 
    messages, 
    inputValue, 
    loading, 
    chatStarted,
    setInputValue,
    handleSubmit,
    startNewChat,
    handleFileUpload
  } = useChat({ messagesEndRef, inputRef });

  useEffect(() => {
    setIsClient(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className={styles.main}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        startNewChat={startNewChat}
        messages={messages}
      />
      
      {sidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
      
      <div className={styles.chatContainer}>
        <Header toggleSidebar={toggleSidebar} />
        
        {!chatStarted ? (
          <WelcomeScreen 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            inputRef={inputRef}
          />
        ) : (
          <>
            <ChatArea 
              messages={messages} 
              loading={loading} 
              messagesEndRef={messagesEndRef}
            />

            <InputForm 
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              inputRef={inputRef}
              loading={loading}
              handleFileUpload={handleFileUpload}
            />
          </>
        )}
      </div>
    </main>
  );
}
