import { useEffect, useState } from 'react';
import { ComponentLibrary } from './pages/ComponentLibrary';
import { ProjectOverview } from './pages/ProjectOverview';
import { Projects } from './pages/Projects';

// /#/ → Workspace · Project overview,  /#/projects → Workspace · Projects,  /#/components → MUI · Components
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
  if (hash === '#/components') return <ComponentLibrary />;
  if (hash === '#/projects') return <Projects />;
  return <ProjectOverview />;
}
