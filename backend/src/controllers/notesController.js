import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.log("error for getting all notes", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.log("error for fiding note", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title.trim() || !content.trim()) {
      console.log("Title and content are required.");
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }
    const note = new Note({ title: title, content: content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("error for posting note", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!title.trim() || !content.trim()) {
      console.log("Title and content are required.");
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.log("error for updating a note", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("error for deleting a note", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
