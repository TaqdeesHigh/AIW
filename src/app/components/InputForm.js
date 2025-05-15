import { FiSend } from 'react-icons/fi';
import styles from '../page.module.css';

export default function InputForm({ inputValue, setInputValue, handleSubmit, inputRef }) {
  return (
    <form onSubmit={handleSubmit} className={styles.bottomInputForm}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Message AIW..."
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
      <div className={styles.disclaimer}>
        AIW can make mistakes. Consider checking important information.
      </div>
    </form>
  );
}