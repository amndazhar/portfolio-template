import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles load first, in cascade order. Component styles are imported by
// each component and therefore always land after these.
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/sections.css';

import App from './App.jsx';
import { installSpringVariables } from './utils/spring.js';
import { greetCuriousDevelopers } from './utils/personality.js';

installSpringVariables();
greetCuriousDevelopers();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
