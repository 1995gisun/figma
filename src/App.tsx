import { useEffect, useState } from 'react';
import { ComponentLibrary } from './pages/ComponentLibrary';
import { ProjectOverview } from './pages/ProjectOverview';

// Two Figma frames, two views:  /#/  → Workspace · Project overview,  /#/components → MUI · Components
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  return hash === '#/components' ? <ComponentLibrary /> : <ProjectOverview />;
}
