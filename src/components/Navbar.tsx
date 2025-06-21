// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX, FiUpload, FiUser, FiSearch } from 'react-icons/fi'
import LoginButton from './LoginButton'
import UserProfile from './UserProfile'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTool, setActiveTool] = useState('')

  // Simulação das ferramentas disponíveis
  const tools = [
    { name: 'Comprimir PDF', slug: 'tools/compress' },
    { name: 'PDF para Excel', slug: 'pdf-to-excel' },
    { name: 'PDF para PPT', slug: 'pdf-to-ppt' },
    { name: 'Comprimir PDF', slug: 'compress-pdf' },
    { name: 'Juntar PDF', slug: 'merge-pdf' },
    { name: 'Dividir PDF', slug: 'split-pdf' },
  ]

  return (
    <nav className=" left-0 bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-red-600">
              <span className="text-3xl text-fuchsia-400 hover:text-fuchsia-500">ABG</span> <span className='text-blue-300 hover:text-blue-400'>Soluções Digitais</span>
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium flex items-center"
                onClick={() => setActiveTool(activeTool ? '' : 'tools')}
              >
                Ferramentas
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown de ferramentas */}
              {activeTool === 'tools' && (
                <div className="absolute z-10 left-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1 grid grid-cols-2 gap-2 p-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm rounded"
                        onClick={() => setActiveTool('')}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/precos" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
              Planos
            </Link>

            <Link href="/sobre" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
              Sobre
            </Link>
            
          </div>

          {/* Botões de ação */}
          <div className="hidden md:flex items-center space-x-4">
            <LoginButton /><UserProfile />
          </div>

          {/* Menu mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t fixed w-full top-16 z-40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative">
              <button
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 flex justify-between items-center"
                onClick={() => setActiveTool(activeTool === 'mobile-tools' ? '' : 'mobile-tools')}
              >
                Ferramentas
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {activeTool === 'mobile-tools' && (
                <div className="pl-4 py-2 space-y-1">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/precos"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>

            <Link
              href="/sobre"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>

            <div className="pt-4 pb-2 border-t">
             
              <LoginButton/>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}