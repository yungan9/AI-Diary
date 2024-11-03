import { useState } from "react";
import { CallGPT } from "./api/gpt";

const dummyData = JSON.parse(
  `{ "title": "코딩의 불확실성과 성장", "thumbnail": "https://source.unsplash.com/1600x900/?coding", "summary": "코딩 강의를 듣고 프로젝트에서 버그를 발견했지만 해결하지 못하고, 결국 GPT의 도움을 받았다.", "emotional_content": "최근 코딩 강의를 듣고 프로젝트에서 여러 버그에 직면하게 되었습니다. 스택오버플로에서 해결 방법을 찾으려 했으나, 원하는 결과를 얻지 못했습니다. 그 과정에서 불안과 좌절감을 느꼈지만, 결국 GPT의 도움을 통해 문제를 해결할 수 있었습니다. 그러나 저는 이 방법이 제 개발 실력 향상에 진정으로 도움이 되는지 의문을 품고 있습니다. 이러한 경험은 저에게 코딩의 불확실성을 다시금 일깨워 주었습니다.", "emotional_result": "이 일은 저에게 코딩의 복잡성과 문제 해결의 어려움을 다시 느끼게 했습니다. 또한, 저는 도움을 받는 것이 부끄러운 일이 아니라는 것을 깨달았습니다.", "analysis": "코딩에서 마주하는 어려움은 성장의 기회입니다. '문제가 있는 곳에 기회가 있다'라는 말처럼, 각 버그와 오류는 더 나은 개발자로 성장하기 위한 중요한 경험입니다. GPT와 같은 도구를 활용하는 것은 결코 나쁜 것이 아닙니다. 오히려 이는 자신의 한계를 이해하고 극복하는 과정의 일부일 수 있습니다.", "action_list": [ "문제를 해결하기 위해 다양한 리소스를 활용하기.", "자신의 경험을 기록하고 반성하는 시간을 갖기.", "코딩 스킬 향상을 위한 규칙적인 연습과 프로젝트 참여." ] }`
);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `
        코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 스택오버플로에서 검색했지만 해결 안되었어.
역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발실력에 도움 될까..?
      `,
      });
      setData(JSON.parse(message));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClickAPICall}>gpt api call</button>
      <div>data:{JSON.stringify(data)}</div>
      <div>isLoading:{isLoading ? "loading..." : "fin"}</div>
    </>
  );
}

export default App;
