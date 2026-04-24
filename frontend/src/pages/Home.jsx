import Hero from '@/components/Hero';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  return (
    <div>
        <Hero navigate={navigate} />
    </div>
  )
}

export default Home;