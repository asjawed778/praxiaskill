import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { FaTrash } from "react-icons/fa";
import { useAddNoteMutation, useDeleteNoteMutation, useGetNotesByVideoQuery } from "../../../services/coursePlayer.api";

const Notes = ({ videoId, currentTime }) => {
  const editor = useRef(null);
  const { data: notes, isLoading, error } = useGetNotesByVideoQuery(videoId);
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [content, setContent] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 

  const handleAddNote = async () => {
    if (!content.trim()) return;
    await addNote({
      videoId,
      timestamp: currentTime,
      content,
      createdAt: new Date().toISOString(),
    });
    setContent("");  
    setIsEditing(false);
  };

  return (
    <div className="m-4 p-4 w-full md:w-3/5">
      <h2 className="text-2xl font-bold">Notes</h2>

      {/* Button to Open Editor */}
      {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 cursor-pointer">
          Take a Note
        </button>
      )}

      {/* Rich Text Editor */}
      {isEditing && (
        <div className="mt-4  p-3 rounded ">
          <JoditEditor ref={editor} value={content} onBlur={setContent}  config={{height:300}}/>
          <div className="flex justify-end mt-2 gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer">
              Cancel
            </button>
            <button onClick={handleAddNote} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="mt-4">
        {notes?.map((note) => (
          <div key={note.id} className="border-b py-2 my-2">
            <div className="flex flex-row justify-between items-center space-x-2">
            <span className="text-sm text-gray-500">At {note.timestamp}</span>
            <button onClick={() => deleteNote(note.id)} className="text-red-600 hover:underline block">
              <FaTrash />
            </button>
          
          </div>
            <div dangerouslySetInnerHTML={{ __html: note.content }} className="mt-1 text-gray-700" />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
