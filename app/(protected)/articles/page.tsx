"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEventHandler, ReactEventHandler, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleOnSubmit = () => {};
  return (
    <div className="px-64 pt-12 ">
      <div>
        <p></p>
        <p></p>
      </div>
      <div>
        <div className="gap-2">
          <Textarea
            value={title}
            onChange={handleTitleChange}
            className="min-h-2 overflow-y-auto resize-none"
            placeholder="Type your message here."
          />
        </div>
        <div className="gap-2">
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Type your message here."
          />
          <Button onClick={handleOnSubmit}>Send message</Button>
        </div>
      </div>
    </div>
  );
}
