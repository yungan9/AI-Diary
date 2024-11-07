import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { Title } from "./CommonStyles";
import styled from "styled-components";
const { TextArea } = Input;

export default function DiaryInput({ isLoading, onSubmit, messageApi }) {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요!",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });
    onSubmit(userInput);
    setUserInput("");
  };

  return (
    <>
      <Title>오늘의 일</Title>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일을 간단히 적어주세요"
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          GPT 회고록 작성하기
        </Button>
      </ButtonContainer>
    </>
  );
}

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;
