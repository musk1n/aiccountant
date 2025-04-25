import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackForm({ onSubmit }: { onSubmit: (feedback: string) => void }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmit(feedback);
      setFeedback("");
    }
  };

  return (
    <div className="p-4 space-y-2">
      <Textarea
        placeholder="Share your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSubmit}>Submit Feedback</Button>
    </div>
  );
}
