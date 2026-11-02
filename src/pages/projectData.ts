import type { Project } from '../components/ProjectTable';

// Sample data shared by the Overview and Projects screens. Overview shows the first four.
export const projects: Project[] = [
  { id: 'p1', name: 'Website redesign', owner: 'Jamie Lee', status: 'In progress', dueDate: 'Nov 12', icon: 'panels-top-left' },
  { id: 'p2', name: 'Mobile app', owner: 'Alex Kim', status: 'In review', dueDate: 'Nov 18', icon: 'smartphone' },
  { id: 'p3', name: 'Design system', owner: 'Sam Park', status: 'In progress', dueDate: 'Nov 24', icon: 'component' },
  { id: 'p4', name: 'Customer portal', owner: 'Taylor Chen', status: 'Completed', dueDate: 'Nov 28', icon: 'monitor' },
  { id: 'p5', name: 'Analytics dashboard', owner: 'Morgan Yoon', status: 'In progress', dueDate: 'Dec 3', icon: 'layout-dashboard' },
  { id: 'p6', name: 'Onboarding flow', owner: 'Alex Kim', status: 'In review', dueDate: 'Dec 8', icon: 'smartphone' },
  { id: 'p7', name: 'Icon library', owner: 'Sam Park', status: 'Completed', dueDate: 'Dec 12', icon: 'layers' },
  { id: 'p8', name: 'Help center', owner: 'Jamie Lee', status: 'In progress', dueDate: 'Dec 19', icon: 'panels-top-left' },
];
