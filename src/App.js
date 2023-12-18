import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  useEffect(() => {
    // On component mount, check if there is a result in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedResult = urlParams.get("result");

    if (encodedResult) {
      // Decode the result and set it in the state
      const result = decodeURIComponent(encodedResult);
      setOutputMessage(result);
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
      setOutputMessage("Thala!");
    } else {
      setOutputMessage("You are not Thala.");
    }
  };

  const shareUrl = () => {
    const encodedResult = encodeURIComponent(outputMessage);
    return `${window.location.origin}?result=${encodedResult}`;
  };

  return (
    <div>
      <h1>Thala Checker</h1>
      <input
        type="text"
        placeholder="Enter text here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {outputMessage && <p>{outputMessage}</p>}
      <div>
        {outputMessage && (
          <div>
            <FacebookShareButton url={shareUrl()}>
              <span>Share on Facebook</span>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl()} title={outputMessage}>
              <span>Share on Twitter</span>
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl()} title={outputMessage}>
              <span>Share on WhatsApp</span>
            </WhatsappShareButton>
            <CopyToClipboard
              text={shareUrl()}
              onCopy={() => alert("URL copied to clipboard")}
            >
              <button>Copy URL</button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
