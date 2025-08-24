
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios'
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon, LoaderIcon} from 'lucide-react';

function NoteDetailPage() {
  const [note, setNote] = useState({
    title:"",
    content:""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/note/${id}`);
        setNote(res.data)
      } catch (error) {
        console.log(error);
        toast.error("Gagal mendapatkan catatan")
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  }, [id])

  const handleDelete = async () =>{
    if(!window.confirm("Apakah anda yakin ingin menghapus?")) return;

    try {
      await api.delete(`/note/${id}`)
      toast.success("Catatan berhasil dihapus");
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus catatan")
    }
  }

  const handleSaving = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Harus ada judul atau isi")
      return
    }
    setSaving(true);

    try {
      await api.put(`/note/${id}`, note);
      toast.success("Berhasil memperbarui catatan")
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui catatan")
    }finally{
      setSaving(false)
    }
  };
    if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Kembali
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5'/>
              Buang Catatan
            </button>
          </div>
          
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text" 
                className='input input-bordered'
                placeholder='Note title'
                value={note.title} 
                onChange={(e) => setNote({...note, title:e.target.value})}/>
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e) => setNote({...note, content:e.target.value})}></textarea>
              </div>

              <div className="card-action justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSaving}>
                  {saving? "Menyimpan...":"Simpan catatan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage