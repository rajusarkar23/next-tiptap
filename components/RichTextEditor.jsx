"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const initialData = [
  {
    _id: "",
    richText: "",
    createdAt: "",
  },
];

const RichTextEditor = () => {
  const [content, setContent] = useState("");
  // console.log(content);

  const [data, setData] = useState(initialData);
  console.log(Array.isArray(data));
  // setup editor
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  // submit data to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ richText: content }),
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // get data from db
  const getData = async () => {
    try {
      const res = await fetch("/api/add", {
        method: "GET",
      });
      const resposne = await res.json();
      setData(resposne.find);
      //   console.log(Array.isArray(resposne.find));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className="bg-black text-white rounded px-3 font-bold mb-2"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().setItalic().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className="bg-black text-white rounded px-3 font-bold mb-2"
        >
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          Strike
        </button>
      </div>

      <EditorContent editor={editor} />
      <div>
        <button
          className="bg-orange-400 text-white hover:bg-orange-500 transition-all rounded p-2 mt-3 font-bold"
          onClick={handleSubmit}
        >
          Add to db
        </button>
        <button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-all rounded p-2 mt-3 font-bold ml-2"
          onClick={getData}
        >
          Fetch from db
        </button>
      </div>

      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-orange-200 space-y-2 mt-2 w-60 px-4 rounded hover:bg-orange-300 transition-all"
          >
            <div dangerouslySetInnerHTML={{ __html: item.richText }} />
            <div dangerouslySetInnerHTML={{ __html: item.createdAt }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RichTextEditor;
