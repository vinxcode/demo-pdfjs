import { useState } from 'react'
import Canvas from './Canvas'

function App() {

  const [name, setName] = useState('')

  return (
    <main className="w-1/2 mx-auto p-20 bg-white shadow-lg mt-20 rounded-xl flex flex-col gap-5">
      <h1 className='text-4xl text-center font-black text-gray-600'>Signing Demo with pdf.js</h1>
      <section className='w-2/3 mx-auto flex flex-col gap-5'>

        <input type="text"  name='name'
        placeholder="Introduce your name" 
        onChange={(e) =>setName(e.target.value)} 
        value={name}
        className='h-12 w-full p-3 border-b-2 border-b-gray-600'/>

        <Canvas/>
      </section>
    </main>
  )
}

export default App
