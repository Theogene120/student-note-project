export default function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{formattedDate}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
        <button
          onClick={() => onEdit(note)}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-sm text-red-400 hover:text-red-600 font-medium transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}
