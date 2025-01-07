import React, { useState } from 'react'

    function App() {
      const [focus, setFocus] = useState('strength')
      const [level, setLevel] = useState('beginner')
      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState(null)

      const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        
        try {
          // Create URL with query parameters
          const url = new URL('https://primary-production-b08b.up.railway.app/webhook/6ccba916-c1eb-4f08-9bbb-07716c4de53e')
          url.searchParams.append('focus', focus)
          url.searchParams.append('level', level)

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          })

          if (!response.ok) {
            throw new Error('Failed to generate workout')
          }

          const htmlContent = await response.text()
          
          // Sanitize and inject HTML
          const container = document.getElementById('workout-container')
          if (container) {
            container.innerHTML = '' // Clear previous content
            container.innerHTML = htmlContent
          }
        } catch (error) {
          console.error('Error:', error)
          setError('Failed to generate workout. Please try again.')
          const container = document.getElementById('workout-container')
          if (container) {
            container.innerHTML = '' // Clear container on error
          }
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <div className="container">
          <h1>Personalized Workout Generator</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Workout Focus:</label>
              <select value={focus} onChange={(e) => setFocus(e.target.value)}>
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>
            <div>
              <label>Fitness Level:</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
              </select>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Workout'}
            </button>
          </form>

          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '20px' }}>
              {error}
            </div>
          )}

          <div id="workout-container" className="workout-content" style={{ marginTop: '20px' }}>
            {/* Workout content will be injected here */}
          </div>
        </div>
      )
    }

    export default App
