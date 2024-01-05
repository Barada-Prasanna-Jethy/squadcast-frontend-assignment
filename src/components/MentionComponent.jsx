import React, { useState } from "react";
import userData from "../../data.json";

const MentionComponent = ({ onChange, value }) => {
  const [inputText, setInputText] = useState(value || "");
  const [mentionOptions, setMentionOptions] = useState([]);
  const [showMentionOptions, setShowMentionOptions] = useState(false);

  const userNameArray = userData.map(
    (user) => `${user.first_name} ${user.last_name}`
  );

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);

    if (newText.includes("@")) {
      const mentionKeyword = newText.split("@").pop().trim();
      if (mentionKeyword) {
        const fetchedOptions = fetchMentionOptions(mentionKeyword);
        setMentionOptions(fetchedOptions);
        setShowMentionOptions(true);
      }
    } else {
      setShowMentionOptions(false);
    }

    onChange(newText);
  };

  const handleMentionSelect = (selectedOption) => {
    const updatedText = inputText.replace(/@\S+$/, `@${selectedOption} `);
    setInputText(updatedText);
    setShowMentionOptions(false);
    onChange(updatedText);
  };

  const fetchMentionOptions = (mentionKeyword) => {
    return userNameArray.filter((option) =>
      option.toLowerCase().includes(mentionKeyword.toLowerCase())
    );
  };

  return (
    <div className="mentionContainer">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Mention"
        className="mentionInput"
      />
      {showMentionOptions && (
        <ul className="mentionOptionList">
          {mentionOptions.map((option, index) => (
            <li
              className="mentionItem"
              key={index}
              onClick={() => handleMentionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentionComponent;
