import { useState } from 'react'
import Canvas from './Canvas'
import { useStore } from './useStore'

function App() {

  const { isOpen, updateIsOpen } = useStore()

  const handleButton = () => {
    updateIsOpen(true)
  }

  return (
    <main className=" w-full md:w-4/5 lg:w-1/2 mx-auto p-7 md:p-20 bg-white shadow-lg mt-20 rounded-xl flex flex-col gap-5">
      <h1 className='text-4xl text-center font-black text-gray-600'>Signing Demo with pdf.js</h1>
      <section className='w-full md:w-3/4 lg:w-2/3 mx-auto flex flex-col gap-5'>

        {
          isOpen ? (
              <Canvas />
          ) : (
            <button className='bg-gray-600 px-10 py-2 text-white font-semibold rounded-lg'
            onClick={handleButton}
            >Open Modal</button>
          )
        }

      </section>
    </main>
  )
}

export default App
