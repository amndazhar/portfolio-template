/* Springy Portfolio · original template by amndazhar · https://github.com/amndazhar/portfolio-template · MIT */
import { useCallback, useEffect, useState } from 'react';

import BootScreen from './components/layout/BootScreen.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Ticker from './components/sections/Ticker/Ticker.jsx';
import Work from './components/sections/Work/Work.jsx';
import ProjectModal from './components/sections/Work/ProjectModal.jsx';
import Playground from './components/sections/Playground/Playground.jsx';
import Process from './components/sections/Process/Process.jsx';
import About from './components/sections/About/About.jsx';
import Contact from './components/sections/Contact/Contact.jsx';
import Toast from './components/common/Toast.jsx';
import CursorSpark from './components/common/CursorSpark.jsx';
import useToast from './hooks/useToast.js';
import { projects } from './content/projects.js';
import { installTabAwayTitle } from './utils/personality.js';

export default function App() {
  const [entered, setEntered] = useState(false);
  // `origin` is the clicked card's rect, so the case study can grow out of it.
  const [openProject, setOpenProject] = useState({ id: null, origin: null });
  const [toast, showToast] = useToast();

  useEffect(installTabAwayTitle, []);

  const activeProject = projects.find((project) => project.id === openProject.id) ?? null;
  const handleEntered = useCallback(() => setEntered(true), []);
  const handleOpenProject = useCallback((id, origin) => setOpenProject({ id, origin }), []);
  const closeProject = useCallback(() => setOpenProject((current) => ({ ...current, id: null })), []);

  return (
    <>
      <BootScreen onExit={handleEntered} />
      <Header />
      <main id="top">
        <Hero entered={entered} />
        <Ticker />
        <Work onOpenProject={handleOpenProject} />
        <Playground />
        <Process />
        <About />
        <Contact onNotify={showToast} />
      </main>
      <Footer />
      <ProjectModal project={activeProject} origin={openProject.origin} onClose={closeProject} />
      <Toast message={toast.message} visible={toast.visible} />
      <CursorSpark />
    </>
  );
}
