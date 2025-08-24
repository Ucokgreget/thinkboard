import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/util'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) =>{
        e.preventDefault()

        if(!window.confirm("Apakah anda ingin menghapus?"))return

        try {
            await api.delete(`/note/${id}`)
            toast.success("Berhasi hapus catatan")
            setNotes((prev) => prev.filter(note => note._id !== id))
        } catch (error) {
            console.log(error);
            toast.error("Gagal hapus catatan")
        }
    }
  return (
  <Link to={`/note/${note._id}`} 
  className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'
  >
    <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content || "Tidak ada isi"}</p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content'>
                {formatDate(note.createdAt)}
            </span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error'>
                    <Trash2Icon className='size-4' onClick={(e) => handleDelete(e, note._id)}/>
                </button>
            </div>
        </div>
    </div>
  </Link>
  )
}

export default NoteCard