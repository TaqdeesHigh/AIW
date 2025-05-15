# AIW - AI Web Interface

A modern and responsive web application built with Next.js for interacting with AI models.

## Overview

**AIW** offers a sleek, user-friendly interface for engaging with various AI models. It serves as a frontend that can be easily connected to any AI API backend of your choice.

## Features

* Clean, modern UI with responsive design
* Support for multiple AI models
* Conversation history management
* Interactive chat interface with loading indicators
* Sidebar with model selection and chat history
* Example queries for quick start

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TaqdeesHigh/aiw.git
   cd aiw
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Connecting Your Own AI Models

The application is designed for easy integration with any AI API. Follow the steps below to connect your own models:

### 1. Modify the `useChat.js` Hook

Update `src/app/hooks/useChat.js` to replace the placeholder logic with your actual API call:

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  if (!chatStarted) setChatStarted(true);

  const userMessage = { role: 'user', content: inputValue };
  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setLoading(true);

  try {
    const response = await fetch('your-ai-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key' // If required
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
        model: selectedModel,
        // Include other API parameters as needed
      })
    });

    const data = await response.json();

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: data.response // Adjust based on API response structure
    }]);
  } catch (error) {
    console.error('Error calling AI API:', error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Sorry, an error occurred. Please try again.'
    }]);
  } finally {
    setLoading(false);
  }
};
```

### 2. Add Your AI Models

Update the model list in `src/app/components/Sidebar.js`:

```jsx
<div className={styles.modelList}>
  <div className={`${styles.modelItem} ${styles.active}`}>
    <div className={styles.modelDot}></div>
    <div className={styles.modelDetails}>
      <span className={styles.modelName}>Your Model Name</span>
      <span className={styles.modelDesc}>Your Model Description</span>
    </div>
  </div>
  {/* Add more model items here */}
</div>
```

### 3. Implement Model Selection

Update `page.js` to handle selected model state:

```jsx
const [selectedModel, setSelectedModel] = useState('default-model');

<Sidebar
  sidebarOpen={sidebarOpen}
  toggleSidebar={toggleSidebar}
  startNewChat={startNewChat}
  messages={messages}
  selectedModel={selectedModel}
  setSelectedModel={setSelectedModel}
/>

const {
  messages,
  inputValue,
  loading,
  chatStarted,
  setInputValue,
  handleSubmit,
  startNewChat
} = useChat({ messagesEndRef, inputRef, selectedModel });
```

In `Sidebar.js`, implement model selection:

```js
const handleModelSelect = (modelId) => {
  setSelectedModel(modelId);
};

<div className={styles.modelList}>
  <div
    className={`${styles.modelItem} ${selectedModel === 'standard' ? styles.active : ''}`}
    onClick={() => handleModelSelect('standard')}
  >
    {/* Model UI */}
  </div>
</div>
```

## Customizing the Interface

### CSS Styling

All styles are located in `src/app/page.module.css`. You can customize layout, colors, and spacing here.

## Adding Features

* **Message Attachments**: Implement file upload in `InputForm.js`
* **Authentication**: Create login/signup components
* **User Preferences**: Add a settings page for AI behavior customization

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
