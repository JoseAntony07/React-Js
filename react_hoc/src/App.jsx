import React from 'react'
import Dashboard from './Dashboard'
import withLoginCheck from './withLoginCheck'


const App = () => {

  // Dashboard: the original component
  // withLoginCheck: the HOC; it takes Dashboard and returns a new component
  // ProtectedDashboard: the enhanced component returned by the HOC

  const ProtectedDashboard = withLoginCheck(Dashboard);

  return (
    <div>
      <ProtectedDashboard />
    </div>
  )
}

export default App