import RichTextEditor from "@/components/RichTextEditor";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-64">
      <div className="justify-center flex">
        <h1>Next + Tiptap</h1>
      </div>
      <div>
        <RichTextEditor />
      </div>
    </div>
  );
}
