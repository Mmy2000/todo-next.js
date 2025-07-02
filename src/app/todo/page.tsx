import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'


const ToDo = () => {
  return (
    <ProtectedRoute>
      <div>ToDo</div>
    </ProtectedRoute>
  );
}

export default ToDo