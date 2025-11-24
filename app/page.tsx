import { prisma } from "@/lib/prisma";
import { addNote, deleteNote } from "./action";

export default async function Home() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="container">
      <h1 className="header-title">📝 Catatan Tugas</h1>
      
      <form action={addNote} className="input-group">
        <input 
          type="text" 
          name="content"
          placeholder="Apa yang ingin dicatat?" 
          className="input-field"
          required
          autoComplete="off"
        />
        <button type="submit" className="btn-add">
          Simpan
        </button>
      </form>

      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-card">
            <span className="note-content">{note.content}</span>
            
            <form action={deleteNote.bind(null, note.id)}>
              <button className="btn-delete">Hapus</button>
            </form>
          </li>
        ))}
        
        {notes.length === 0 && (
          <p className="empty-state">Belum ada catatan. Yuk tulis sesuatu!</p>
        )}
      </ul>
    </main>
  );
}