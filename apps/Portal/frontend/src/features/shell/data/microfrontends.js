export const microfrontends = [
  {
    key: 'pilot',
    name: 'Pilot',
    description: 'Experimental workspace for exploring ideas, components, and utilities.',
    frontendUrl: 'http://localhost:5173',
    backendUrl: 'http://localhost:5100/api/health',
  },
  {
    key: 'project2',
    name: 'Project 2',
    description: 'Reserved workspace. Not yet scoped.',
    frontendUrl: 'http://localhost:5174',
    backendUrl: 'http://localhost:3001/api/health',
  },
  {
    key: 'components',
    name: 'Components',
    description: 'Shared component library. Browse components and run their interaction tests live in Storybook.',
    frontendUrl: 'http://localhost:6006',
  },
];
