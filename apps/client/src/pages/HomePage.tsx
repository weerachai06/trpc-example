import React from 'react'
import { trpc } from '../utils/trpc'

const HomePage = () => {
  const hello = trpc.hello.useQuery('name');
  if (!hello.data) return <div>Loading...</div>;
  return (
    <div>{hello.data.name}</div>
  )
}

export default HomePage