
import './App.css'
import { useEffect, useState } from 'react'
import Login from './components/Login';
import Messages from './components/Messages';

import { supabase } from './supabaseClient'

function App() {
  const [secion, setSecion] = useState(null);

  useEffect( () =>{
    getSeccion()
  }, [])

  const getSeccion = async () => {
    const {data} = await supabase.auth.getSession();
    setSecion(data.session);
  }

  return (
    <div className="App">
      <h1>WhatsApp</h1>
      <p>ReactJs & Supabase</p>
      <div className="container">
        {/* Change section ig log in or log out */}
        { secion ? <Messages/> : <Login/> }
      </div>
    </div>
  )
}

export default App