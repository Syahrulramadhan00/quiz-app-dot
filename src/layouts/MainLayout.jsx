// MainLayout.jsx
import { Sidebar } from "../components/sidebar"
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="ml-64 max-[640px]:ml-0 p-4 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
