import React, { useState } from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;

export default function DiaryInput({ isLoading, onSubmit }) {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onSubmit(userInput);
  };

  return (
    <>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일을 간단히 적어주세요"
      />
      <Button loading={isLoading} onClick={handleClick}>
        GPT 회고록 작성하기
      </Button>
    </>
  );
}
