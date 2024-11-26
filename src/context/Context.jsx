import { createContext, useState } from "react";
import run from "../config/gemini"; // Ensure `run` is correctly implemented and exported.

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    try {
      setResultData(""); // Clear previous result
      setLoading(true); // Start loading
      setShowResult(true); // Show result area

      const activePrompt = prompt || input.trim();
      if (!activePrompt) {
        throw new Error("No prompt or input provided.");
      }

      setRecentPrompt(activePrompt);
      setPrevPrompts((prev) => {
        // Avoid duplicate prompts in the history
        if (!prev.includes(activePrompt)) {
          return [...prev, activePrompt];
        }
        return prev;
      });

      const response = await run(activePrompt); // Process the prompt or input

      // Formatting response
      let formattedResponse = response
        .split("**")
        .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .split("*")
        .join("<br/>");

      setResultData(formattedResponse); // Set the formatted response
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("An error occurred while processing your request.");
    } finally {
      setLoading(false); // Stop loading
      setInput(""); // Clear input field
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
