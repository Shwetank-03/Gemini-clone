import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = async () => {
    if (input.trim() === "") {
      alert("Please enter a prompt.");
      return;
    }

    try {
      await onSent(input);
      setInput("");
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div className="main">
      
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult
          ? <>
            <div className="greet">
              <p>
                <span>Hello, User</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          : <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
              ?<div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              
              : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
             
            </div>
          </div>

        }

        {/* Input and Info Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input ?<img src={assets.send_icon} alt="Send Icon" onClick={handleSend} />: null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and Gemini Apps. Made by Shwetank.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
