// Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { login } from '../auth/auth'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginFailure } from '../stores/slices/authSlice'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    const success = login(email, password)

    if (success) {
      dispatch(loginSuccess({ email }))
      navigate('/')
    } else {
      dispatch(loginFailure('Invalid email or password'))
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-1">Login to your Account</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email address*
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Enter password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
