import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteCard from './components/NoteCard'
import { getNotes, createNote, updateNote, deleteNote } from './api'

export default function App() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const res = await getNotes()
      setNotes(res.data)
      setError('')
    } catch {
      setError('Could not connect to the backend. Make sure Flask is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const handleSubmit = async ({ title, content }) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, { title, content })
        setEditingNote(null)
      } else {
        await createNote({ title, content })
      }
      fetchNotes()
    } catch {
      setError('Failed to save note.')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return
    try {
      await deleteNote(id)
      fetchNotes()
    } catch {
      setError('Failed to delete note.')
    }
  }

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">📓 Student Notes</h1>
          <p className="text-gray-500 mt-1">Manage your study notes in one place</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <NoteForm
          onSubmit={handleSubmit}
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />

        {/* Search */}
        <div className="mb-6">
          <p className='text-md font-semibold mb-4 opacity-80'>Search Note Here:</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          />
        </div>

        {/* Notes grid */}
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading notes...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            {search ? 'No notes match your search.' : 'No notes yet. Add your first one above!'}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setEditingNote}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          {notes.length} note{notes.length !== 1 ? 's' : ''} total
        </p>
      </div>
    </div>
  )
}
