import './index.css'
import ReactDOM from 'react-dom/client'
import logo from './assets/logo.png'
import Sidebar from './components/Sidebar'

const App = () => {
  const sendMessage = () => {
    parent.postMessage({ pluginMessage: { type: 'greet', text: 'Hello from UI!' } }, '*')
  }

  return (
    <div>
      <h1>Hello Figma Plugin!</h1>
      <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
      <button onClick={sendMessage} className='bg-blue-500 text-white py-2 px-4 rounded'>Send to Backend</button>

      <Sidebar />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
