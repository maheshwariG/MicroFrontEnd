import React from 'react';
import Home from './containers/Home';
const ApplicationA = React.lazy(() => import('ApplicationA/App'));
const ApplicationB = React.lazy(() => import('ApplicationB/App'));
const App=()=>{
  return (
    <>
    <Home/>
    <React.Suspense fallback={<div>Loading</div>}>
      <ApplicationA name='test'/>
      <ApplicationB/>
    </React.Suspense>
   </>
  )
}
export default App;
