
const hardcodedUser = {
  email: 'user@example.com',
  password: 'password123'
}


export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true'
}

export const login = (email, password) => {
  if (email === hardcodedUser.email && password === hardcodedUser.password) {
    localStorage.setItem('isAuthenticated', 'true')
    return true
  }
  return false
}

export const logout = () => {
  localStorage.removeItem('isAuthenticated')
}
