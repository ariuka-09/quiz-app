"use client";

import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// 1. Import the Loader icon
import { Loader2, Sparkles, FileText } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 2. Add the isLoading state
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleOnSubmit = async () => {
    // 3. Start loading
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/article", {
        title: title,
        content: content,
      });
      const id = response.data.id;
      router.push(`/articles/summary/${id}`);
    } catch (error) {
      console.error("Generation failed:", error);
      // 4. Stop loading if there is an error
      setIsLoading(false);
    }
  };

  // Helper to check if button should be disabled
  const isButtonDisabled = !title.trim() || !content.trim() || isLoading;

  return (
    <div className="mx-[10%] flex flex-col gap-5 border border-slate-200 rounded-xl p-7 bg-white shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center text-2xl font-bold gap-2 text-slate-900">
          <Sparkles className="w-7 h-7 text-[#fabd32]" />
          Article Quiz Generator
        </div>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          Paste your article below to generate a summary and quiz questions.
          Your articles will be saved in the sidebar for future reference.
        </p>
      </div>

      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label className="flex gap-2 items-center text-slate-600 font-bold text-sm">
          <FileText className="w-4 h-4" />
          Article Title
        </label>
        <Textarea
          value={title}
          onChange={handleTitleChange}
          className="min-h-[40px] resize-none focus-visible:ring-[#fabd32]"
          placeholder="Enter a title for your article..."
        />
      </div>

      {/* Content Input */}
      <div className="flex flex-col gap-2">
        <label className="flex gap-2 items-center text-slate-600 font-bold text-sm">
          <FileText className="w-4 h-4" />
          Article Content
        </label>
        <Textarea
          value={content}
          onChange={handleContentChange}
          className="min-h-[200px] focus-visible:ring-[#fabd32]"
          placeholder="Paste the full article content here..."
        />

        <div className="flex justify-end mt-2">
          {!isLoaded ? (
            <Button disabled variant="secondary">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Auth Loading...
            </Button>
          ) : (
            <Button
              className="min-w-[160px] bg-slate-900 hover:bg-black text-white font-bold transition-all"
              onClick={handleOnSubmit}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate summary"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
