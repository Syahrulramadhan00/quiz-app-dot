import { useEffect, useRef, useState } from 'react'
import { LuFileSpreadsheet } from "react-icons/lu"
import { MdHistory } from "react-icons/md"
import { IoMdMenu } from "react-icons/io"
import { useNavigate, useLocation } from "react-router-dom"

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClose = () => setIsOpen(false)

  const handleNavigate = (path) => {
    navigate(path)
    handleClose()
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  const getLinkClass = (path) =>
    `flex items-center p-2 rounded-lg group ${
      location.pathname === path
        ? 'bg-primary text-white'
        : 'text-gray-900 hover:bg-primary hover:text-white'
    }`

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <IoMdMenu className="w-6 h-6" />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r-2 border-gray-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={() => handleNavigate("/")}
                className={getLinkClass("/")}
              >
                <LuFileSpreadsheet className="text-lg" />
                <span className="ms-3">Quiz</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigate("/history")}
                className={getLinkClass("/history")}
              >
                <MdHistory className="text-lg" />
                <span className="ms-3">History</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
