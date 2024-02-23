import React from 'react';

function Content({ children }) {
  return (
    <main style={{ paddingTop: '70px', paddingBottom: '70px', overflowY: 'auto' }}>
      {/* Render dynamic content */}
      {children}
    </main>
  );
}

export default Content;