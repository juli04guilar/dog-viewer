import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string | number;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  width = 300,
  children,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : `-${width}px`,
        height: '100vh',
        width: typeof width === 'number' ? `${width}px` : width,
        backgroundColor: '#fff',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '1rem' }}>
        <button
          onClick={onClose}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
