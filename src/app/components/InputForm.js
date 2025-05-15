import { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiFile, FiImage, FiX } from 'react-icons/fi';
import styles from '../page.module.css';

export default function InputForm({ inputValue, setInputValue, handleSubmit, inputRef, loading, handleFileUpload }) {
  const fileInputRef = useRef(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };
  
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        const isImage = file.type.startsWith('image/');

        const reader = new FileReader();
        reader.onload = (event) => {
          const newFile = {
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            name: file.name,
            type: isImage ? 'image' : 'file',
            content: isImage ? event.target.result : null,
            preview: isImage ? event.target.result : (file.type.includes('text') ? event.target.result.substring(0, 50) + '...' : null),
            file: file
          };
          
          setAttachedFiles(prev => [...prev, newFile]);
        };
        
        if (isImage) {
          reader.readAsDataURL(file);
        } else if (file.type.includes('text')) {
          reader.readAsText(file);
        } else {
          setAttachedFiles(prev => [...prev, {
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            name: file.name,
            type: 'file',
            file: file
          }]);
        }
      });
      
      e.target.value = null; 
    }
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData.files && e.clipboardData.files.length > 0) {
        e.preventDefault();
        Array.from(e.clipboardData.files).forEach(file => {
          const isImage = file.type.startsWith('image/');
          
          const reader = new FileReader();
          reader.onload = (event) => {
            const newFile = {
              id: Date.now() + Math.random().toString(36).substring(2, 9),
              name: file.name || `pasted-${isImage ? 'image' : 'file'}-${Date.now()}.${isImage ? 'png' : 'txt'}`,
              type: isImage ? 'image' : 'file',
              content: event.target.result,
              preview: isImage ? event.target.result : event.target.result.substring(0, 50) + '...',
              file: file
            };
            
            setAttachedFiles(prev => [...prev, newFile]);
          };
          
          if (isImage) {
            reader.readAsDataURL(file);
          } else {
            reader.readAsText(file);
          }
        });
        return;
      }

      const pastedText = e.clipboardData.getData('text');
      const wordCount = pastedText.trim().split(/\s+/).length;
      
      if (wordCount > 100) {
        e.preventDefault();
        
        const file = new File([pastedText], `pasted-content-${Date.now()}.txt`, {
          type: 'text/plain'
        });

        setAttachedFiles(prev => [...prev, {
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: 'file',
          content: pastedText,
          preview: pastedText.substring(0, 50) + '...',
          file: file
        }]);
      }
    };
    
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('paste', handlePaste);
    }
    
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [inputRef]);
  
  const removeAttachedFile = (id) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (attachedFiles.length === 0 && !inputValue.trim() || loading) return;
    
    const message = {
      text: inputValue.trim(),
      files: [...attachedFiles]
    };
    setInputValue('');
    setAttachedFiles([]);
    
    handleSubmit(e, message);
  };
  
  return (
    <form onSubmit={handleFormSubmit} className={styles.bottomInputForm}>
      {attachedFiles.length > 0 && (
        <div className={styles.attachedFilesContainer}>
          {attachedFiles.map(file => (
            <div key={file.id} className={styles.attachedFileItem}>
              <div className={styles.attachedFileIcon}>
                {file.type === 'image' ? <FiImage /> : <FiFile />}
              </div>
              <div className={styles.attachedFileName}>
                {file.name}
                {file.preview && <span className={styles.attachedFilePreview}>{file.preview}</span>}
              </div>
              <button 
                type="button" 
                className={styles.removeFileButton}
                onClick={() => removeAttachedFile(file.id)}
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.inputContainer}>
        <button 
          type="button" 
          className={styles.attachButton}
          onClick={triggerFileUpload}
          disabled={loading}
        >
          <FiPaperclip />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={loading ? "Waiting for response..." : "Message AIW..."}
          className={styles.input}
          disabled={loading}
        />
        
        <button 
          type="submit" 
          className={styles.sendButton} 
          disabled={((attachedFiles.length === 0 && !inputValue.trim()) || loading)}
        >
          <FiSend />
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
          accept="image/*,.txt,.pdf,.doc,.docx"
          multiple
        />
      </div>
      <div className={styles.disclaimer}>
        AIW can make mistakes. Consider checking important information.
      </div>
    </form>
  );
}