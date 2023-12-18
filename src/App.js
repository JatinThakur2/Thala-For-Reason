import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactPlayer from "react-player";
import "./App.css";

function SharePopup({ url, title }) {
  return (
    <div>
      <FacebookShareButton url={url}>
        <span>Share on Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <span>Share on Twitter</span>
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <span>Share on WhatsApp</span>
      </WhatsappShareButton>
      <CopyToClipboard
        text={url}
        onCopy={() => alert("URL copied to clipboard")}
      >
        <button>Copy URL</button>
      </CopyToClipboard>
    </div>
  );
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isThala, setIsThala] = useState(false);
  const [showParty, setShowParty] = useState(false);

  useEffect(() => {
    // On component mount, check if there is a result in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedResult = urlParams.get("result");

    if (encodedResult) {
      // Decode the result and set it in the state
      const result = decodeURIComponent(encodedResult);
      setOutputMessage(result);
      setIsThala(result === "Thala!");
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const countLetters = (input) => {
    return input.replace(/[^a-zA-Z]/g, "").length;
  };

  const calculateSum = (input) => {
    const letterCount = countLetters(input);
    const numberSum = input
      .split("")
      .filter((char) => !isNaN(parseInt(char, 10)))
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    return { letterCount, numberSum };
  };

  const handleSubmit = () => {
    const { letterCount, numberSum } = calculateSum(inputValue);

    if (letterCount === 7 || numberSum === 7) {
      setOutputMessage("Congratulation you are Thala for reason!");
      setIsThala(true);
      setShowParty(true);

      // Hide party after 3 seconds
      setTimeout(() => {
        setShowParty(false);
      }, 3000);
    } else {
      setOutputMessage("You are not Thala.");
      setIsThala(false);
    }
  };

  const shareUrl = () => {
    const encodedResult = encodeURIComponent(outputMessage);
    return `${window.location.origin}?result=${encodedResult}`;
  };

  const openSharePopup = () => {
    setShowSharePopup(true);
  };

  const closeSharePopup = () => {
    setShowSharePopup(false);
  };

  return (
    <div>
      <h1>Thala Checker</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter text here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        {outputMessage && <p className="result">{outputMessage}</p>}
        <div>
          {outputMessage && (
            <div>
              <button onClick={openSharePopup}>Share</button>
            </div>
          )}
        </div>

        {showSharePopup && (
          <div className="share-popup">
            <SharePopup url={shareUrl()} title={outputMessage} />
            <button onClick={closeSharePopup}>Close</button>
          </div>
        )}

        {isThala && (
          <div className="video-container">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=O9en3WlUcGg`}
              playing
              loop
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>

      {showParty && (
        <div className="party-bombs">
          <p>"Congratulation you are Thala for reason!"</p>
        </div>
      )}
    </div>
  );
}

export default App;
