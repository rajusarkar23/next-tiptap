"use client";

import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const initialData = [
  {
    _id: "",
    richText: "",
    createdAt: "",
  },
];

const RichTextEditor = () => {
  const [content, setContent] = useState("");
  console.log(content);

  const [data, setData] = useState(initialData);
  console.log(Array.isArray(data));
  // setup editor
  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // add image
  const addImage = useCallback(() => {
    if (!editor) {
      return;
    }
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

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

  // const url = window.prompt("URL")

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
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="bg-black text-white rounded px-3 font-bold mb-2"
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="bg-black text-white rounded px-3 font-bold mb-2"
        >
          li
        </button>

        {/* add image */}
        <button
          onClick={addImage}
          className="bg-black text-white rounded px-3 font-bold mb-2"
        >
          Add image
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
            {/* preserve the empty p tags with br */}
            <div
              dangerouslySetInnerHTML={{
                __html: item.richText.replace(/<p>\s*<\/p>/g, "<br>"),
              }}
              className="whitespace-pre-wrap [&>ul]:list-disc [&>ul]:pl-6"
            />
            <div dangerouslySetInnerHTML={{ __html: item.createdAt }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RichTextEditor;
