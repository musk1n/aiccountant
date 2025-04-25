import { createContext, useContext, useState } from "react";

const FeedbackContext = createContext<{
  feedbacks: string[];
  addFeedback: (fb: string) => void;
}>({
  feedbacks: [],
  addFeedback: () => {},
});

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  const addFeedback = (fb: string) => {
    setFeedbacks((prev) => [...prev, fb]);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);
