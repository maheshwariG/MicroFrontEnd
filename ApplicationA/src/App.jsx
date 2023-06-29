import React from 'react';
import Home from './containers/Home';
const App=(props)=>{
  const {name}=props;
  return (
    <>
    <div>{name}</div>
    <Home/>
    </>
  )
}
export default App;
