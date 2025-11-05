import React from 'react';
import { createRoot } from 'react-dom/client';
import PhotoEditor from './components/photo-editor';

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <React.StrictMode>
    <PhotoEditor />
  </React.StrictMode>
);
