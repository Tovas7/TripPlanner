"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Save, Trash2, X } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

interface TripNotesProps {
  notes: Note[]
  tripId: string
}

export function TripNotes({ notes: initialNotes, tripId }: TripNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [editNote, setEditNote] = useState({ title: "", content: "" })

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) return

    const note = {
      id: `note-${Date.now()}`,
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
    }

    setNotes([...notes, note])
    setNewNote({ title: "", content: "" })
    setIsAdding(false)
  }

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (!note) return

    setEditNote({ title: note.title, content: note.content })
    setEditingId(id)
  }

  const handleSaveEdit = (id: string) => {
    if (!editNote.title || !editNote.content) return

    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: editNote.title,
              content: editNote.content,
            }
          : note,
      ),
    )
    setEditingId(null)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trip Notes</h2>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Note content"
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </CardFooter>
        </Card>
      )}

      {notes.length === 0 && !isAdding ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No notes yet. Add your first note to keep track of important details.
          </p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {editingId === note.id ? (
                    <Input
                      value={editNote.title}
                      onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                      className="font-bold"
                    />
                  ) : (
                    note.title
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingId === note.id ? (
                  <Textarea
                    value={editNote.content}
                    onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                    rows={4}
                  />
                ) : (
                  <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {editingId === note.id ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSaveEdit(note.id)}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleEditNote(note.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(note.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
