import { useState } from "react";
import { CallGPT } from "./api/gpt";
import styled from "styled-components";
import DiaryInput from "./components/DiaryInput";
import logo from "./assets/logo.png";
import DiaryDisplay from "./components/DiaryDisplay";
import { message } from "antd";

const dummyData = JSON.parse(
  `{ "title": "코딩의 불확실성과 성장", "thumbnail": "data:image/jpeg;base64,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", "summary": "코딩 강의를 듣고 프로젝트에서 버그를 발견했지만 해결하지 못하고, 결국 GPT의 도움을 받았다.", "emotional_content": "최근 코딩 강의를 듣고 프로젝트에서 여러 버그에 직면하게 되었습니다. 스택오버플로에서 해결 방법을 찾으려 했으나, 원하는 결과를 얻지 못했습니다. 그 과정에서 불안과 좌절감을 느꼈지만, 결국 GPT의 도움을 통해 문제를 해결할 수 있었습니다. 그러나 저는 이 방법이 제 개발 실력 향상에 진정으로 도움이 되는지 의문을 품고 있습니다. 이러한 경험은 저에게 코딩의 불확실성을 다시금 일깨워 주었습니다.", "emotional_result": "이 일은 저에게 코딩의 복잡성과 문제 해결의 어려움을 다시 느끼게 했습니다. 또한, 저는 도움을 받는 것이 부끄러운 일이 아니라는 것을 깨달았습니다.", "analysis": "코딩에서 마주하는 어려움은 성장의 기회입니다. '문제가 있는 곳에 기회가 있다'라는 말처럼, 각 버그와 오류는 더 나은 개발자로 성장하기 위한 중요한 경험입니다. GPT와 같은 도구를 활용하는 것은 결코 나쁜 것이 아닙니다. 오히려 이는 자신의 한계를 이해하고 극복하는 과정의 일부일 수 있습니다.", "action_list": [ "문제를 해결하기 위해 다양한 리소스를 활용하기.", "자신의 경험을 기록하고 반성하는 시간을 갖기.", "코딩 스킬 향상을 위한 규칙적인 연습과 프로젝트 참여." ] }`
);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error?.message,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    console.log(userInput);
    handleClickAPICall(userInput);
  };

  return (
    <AppContainer>
      {contextHolder}
      <AppTitle>
        심리상담사 GPT, AI 회고록 <img width={"100px"} src={logo}></img>
      </AppTitle>
      <DiaryInput
        messageApi={messageApi}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      <DiaryDisplay isLoading={isLoading} data={data} />
      <button onClick={handleClickAPICall}>gpt api call</button>
      <div>data:{JSON.stringify(data)}</div>
      <div>isLoading:{isLoading ? "loading..." : "fin"}</div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Serif KR";
`;
