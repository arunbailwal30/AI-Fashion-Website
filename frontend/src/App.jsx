import { useMemo, useState } from 'react'
import './App.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function App() {
  const [dressName, setDressName] = useState('')
  const [size, setSize] = useState('M')
  const [realtimeMessage, setRealtimeMessage] = useState('')

  const [userImage, setUserImage] = useState(null)
  const [dressImage, setDressImage] = useState(null)
  const [uploadMessage, setUploadMessage] = useState('')

  const canSubmitUpload = useMemo(() => userImage && dressImage, [userImage, dressImage])

  const handleRealtimeSubmit = async (event) => {
    event.preventDefault()
    setRealtimeMessage('Starting realtime session...')

    const formData = new FormData()
    formData.append('dress_name', dressName)
    formData.append('size', size)

    const response = await fetch(`${apiBaseUrl}/api/try-on/realtime`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    setRealtimeMessage(`${data.message} Session: ${data.session_id}`)
  }

  const handleUploadSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmitUpload) {
      return
    }

    setUploadMessage('Generating try-on image...')

    const formData = new FormData()
    formData.append('user_image', userImage)
    formData.append('dress_image', dressImage)

    const response = await fetch(`${apiBaseUrl}/api/try-on/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    setUploadMessage(`${data.message} Output: ${data.generated_image_url}`)
  }

  return (
    <main className="app">
      <header>
        <h1>AI Fashion Try-On</h1>
        <p>Select a dress for realtime try-on or upload images to generate a preview.</p>
      </header>

      <section className="card">
        <h2>Realtime Try-On</h2>
        <form onSubmit={handleRealtimeSubmit}>
          <label htmlFor="dressName">Dress name</label>
          <input
            id="dressName"
            value={dressName}
            onChange={(event) => setDressName(event.target.value)}
            required
          />

          <label htmlFor="size">Size</label>
          <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <button type="submit">Start Session</button>
        </form>
        <p className="status">{realtimeMessage}</p>
      </section>

      <section className="card">
        <h2>Image Upload Try-On</h2>
        <form onSubmit={handleUploadSubmit}>
          <label htmlFor="userImage">User image</label>
          <input
            id="userImage"
            type="file"
            accept="image/*"
            onChange={(event) => setUserImage(event.target.files?.[0] ?? null)}
            required
          />

          <label htmlFor="dressImage">Dress image</label>
          <input
            id="dressImage"
            type="file"
            accept="image/*"
            onChange={(event) => setDressImage(event.target.files?.[0] ?? null)}
            required
          />

          <button type="submit" disabled={!canSubmitUpload}>
            Generate Try-On Image
          </button>
        </form>
        <p className="status">{uploadMessage}</p>
      </section>
    </main>
  )
}

export default App
