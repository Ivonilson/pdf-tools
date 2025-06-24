// components/Footer.tsx
import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 py-4 border-t border-gray-200">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600 text-sm">
                    © {currentYear} <span className="font-semibold text-blue-600">ABG Soluções Digitais</span>. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}