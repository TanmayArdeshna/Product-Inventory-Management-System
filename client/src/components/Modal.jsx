import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scroll on the body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scroll
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-elegant w-full max-w-md mx-4 animate-fade-in-up"
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-display text-xl font-semibold text-gray-900">{title}</h3>
          </div>
        )}
        
        <div className="px-6 py-5">{children}</div>
        
        {footer && <div className="px-6 py-4 border-t border-gray-100 flex justify-end">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
