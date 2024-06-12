import { useState } from "react";

const EditableText = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("This is some text.");
  const [draftText, setDraftText] = useState(text);

  const handleEdit = () => {
    setDraftText(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(draftText);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setDraftText(text);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDiscard}>Discard</button>
        </div>
      ) : (
        <div>
          <p>{text}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
