import { NotebookIcon } from 'lucide-react'
import {Link} from 'react-router'
import React from 'react'

function NoteNotFound() {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
      <div className='bg-primary/10 rounded-full p-8'>
        <NotebookIcon className='size-10 text-primary' />
      </div>
      <h3 className='text-2xl font-bold'>Tidak ada catatan</h3>
      <p className='text-base-content/70'>Siap untuk menuangkan ide-ide kamu? Buat catatan pertamamu dan mulai perjalanan produktif kamu! </p>
      <Link to='/create' className='btn btn-primary'>
      Buat Catatan
      </Link>
    </div>
  )
}

export default NoteNotFound