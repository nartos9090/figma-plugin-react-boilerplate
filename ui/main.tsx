import ReactDOM from 'react-dom/client'

const App = () => {
  const sendMessage = () => {
    parent.postMessage({ pluginMessage: { type: 'greet', text: 'Hello from UI!' } }, '*')
  }

  return (
    <div>
      <h1>Hello Figma Plugin!</h1>
      <button onClick={sendMessage}>Send to Backend</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
