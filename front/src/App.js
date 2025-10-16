import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public/Public'
import Login from './features/auth/Login';
import DashLayout from './components/Private/DashLayout';
import Welcome from './features/auth/Welcome';
import Project from './components/Project/Project';
import About from './components/Public/About/About';
import ProjectPage from './components/Project/ProjectPage';
import ProjectLayout from './components/Project/ProjectLayout';

function App() {
  return (
    // These routes are hierarchical in structure
    <Routes>
      {/* this is the root route that has an 'index.' The index is the route it goes to first */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />

        <Route path='projects' element={<ProjectLayout />}>
          <Route index element={<Project />} /> 
          <Route path='test' element={<ProjectPage />} />
          <Route path=':slug' element={<ProjectPage />} />
        </Route>
        <Route path='about' element={<About />} />

        {/* after that we have the login which would be /login  */}
        <Route path='login' element={<Login />}/>

        {/* and then we have the /dash but this has its own index that it defaults to */}
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
