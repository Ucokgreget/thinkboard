
import React, { useEffect, useState } from 'react'
import NavBar from '../component/NavBar'
import RateLimitedUI from '../component/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../component/NoteCard'
import NoteNotFound from '../component/NoteNotFound'

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () =>{
      try {
        const res = await axios.get('http://localhost:3000/api/v1/note')
        setNotes(res.data.notes)
        setIsRateLimited(false)
        console.log(res.data)
      } catch (error) {
        console.log(error);
        
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Gagal memuat data")
        }
        
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])
  return (
    <div>
      <NavBar />

      {/* {isRateLimited && <RateLimitedUI />} */}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'></div>}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default HomePage