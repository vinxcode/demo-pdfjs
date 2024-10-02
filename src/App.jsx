import { useState } from 'react'
import Canvas from './Canvas'
import { useStore } from './useStore'

function App() {

  const { isOpen, updateIsOpen } = useStore()

  const handleButton = () => {
    updateIsOpen(true)
  }

  return isOpen ? (
    <div className='w-full bg-black h-screen m-0 relative z-10 py-20 bg-opacity-70 backdrop-filter
    backdrop-blur-lg'>
      <main className=" w-full md:w-4/5 lg:w-1/2 mx-auto p-7 md:p-20 bg-white shadow-lg rounded-xl flex flex-col gap-5 relative z-10">
        <section className='w-full md:w-3/4 lg:w-2/3 mx-auto flex flex-col gap-5 '>
          <h1 class="text-center text-gray-600 text-4xl font-black">Demo Signature with Pdf.js</h1>
          <Canvas />

        </section>
      </main>
    </div>
  ) : (

    <div className='w-full flex flex-col gap-5 justify-center mt-10'>
      <h1 class="text-center text-gray-600 text-4xl font-black mt-20">Demo Signature with Pdf.js</h1>
      <button className='bg-gray-600 px-10 py-2 text-white font-semibold rounded-lg mx-auto'
        onClick={handleButton}
      >Open Modal</button>
    </div>
  )
}

export default App

