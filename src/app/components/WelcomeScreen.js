import { FiSend } from 'react-icons/fi';
import styles from '../page.module.css';

export default function WelcomeScreen({ inputValue, setInputValue, handleSubmit, inputRef }) {
  return (
    <div className={styles.centeredContent}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeHeader}>
          <h2>Welcome to AIW</h2>
          <p>Your intelligent assistant</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.centeredInputForm}>
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AIW anything..."
              className={styles.input}
            />
            <button 
              type="submit" 
              className={styles.sendButton} 
              disabled={!inputValue.trim()}
            >
              <FiSend />
            </button>
          </div>
        </form>
        
        <div className={styles.exampleQueries}>
          <h3>Try asking</h3>
          <div className={styles.exampleGrid}>
            <button 
              className={styles.exampleButton}
              onClick={() => setInputValue("Explain quantum computing in simple terms")}
            >
              Explain quantum computing in simple terms
            </button>
            <button 
              className={styles.exampleButton}
              onClick={() => setInputValue("Write a short poem about technology")}
            >
              Write a short poem about technology
            </button>
            <button 
              className={styles.exampleButton}
              onClick={() => setInputValue("What are some creative ways to stay productive?")}
            >
              Creative ways to stay productive
            </button>
            <button 
              className={styles.exampleButton}
              onClick={() => setInputValue("How can I learn programming effectively?")}
            >
              How to learn programming effectively
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}