import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light text-dark text-center py-2">
      <div className="container">
      <p>&copy; {currentYear} All Rights Reserved by Dharm Solanki.</p>
      </div>
    </footer>
  )
}
