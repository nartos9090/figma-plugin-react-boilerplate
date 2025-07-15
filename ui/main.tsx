import ReactDOM from 'react-dom/client'
import logo from './assets/logo.png'

const App = () => {
  const sendMessage = () => {
    parent.postMessage({ pluginMessage: { type: 'greet', text: 'Hello from UI!' } }, '*')
  }

  return (
    <div>
      <h1>Hello Figma Plugin!</h1>
      <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
      <button onClick={sendMessage}>Send to Backend</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
