import React, { useState, useEffect } from "react";

function Draft() {
  const [update, setUpdate] = useState("");

  useEffect(() => {
    const storedContent = localStorage.getItem("draftContent");
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setUpdate(parsedContent);
      } catch (error) {
        console.error("Error parsing stored content:", error);
      }
    }
  }, []);

  const changeHandler = (e) => {
    let newText = e.target.value;
    let updatedContent = "";

    if (newText.startsWith("* ")) {
      updatedContent = { type: "strong", content: newText.substring(2) };
    } else if (newText.startsWith("** ")) {
      updatedContent = {
        type: "span",
        style: { color: "red", fontWeight: "bold" },
        content: newText.substring(3),
      };
    } else if (newText.startsWith("*** ")) {
      updatedContent = {
        type: "span",
        style: { textDecoration: "underline", fontWeight: "bold" },
        content: newText.substring(4),
      };
    } else if (newText.startsWith("# ")) {
      updatedContent = { type: "h1", content: newText.substring(2) };
    }

    setUpdate(updatedContent);
  };

  const saveHandler = () => {
    localStorage.setItem("draftContent", JSON.stringify(update));
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        paddingTop: "50px",
        fontFamily: "Poppins",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Editor</h1>
      <div>
        <input
          type="text"
          onChange={changeHandler}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
          }}
          placeholder="Type here..."
        />
        <button
          onClick={saveHandler}
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>

      <div style={{ fontSize: "18px", fontFamily: "Poppins" }}>
        {update.type === "strong" && <strong>{update.content}</strong>}
        {update.type === "span" && (
          <span style={update.style}>{update.content}</span>
        )}
        {update.type === "h1" && <h1>{update.content}</h1>}
      </div>
      <br />
    </div>
  );
}

export default Draft;
