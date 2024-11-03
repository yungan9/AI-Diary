export const CallGPT = async () => {
  console.log("test");
  // curl https://api.openai.com/v1/chat/completions \
  // -H "Content-Type: application/json" \
  // -H "Authorization: Bearer $OPENAI_API_KEY" \
  // -d '{
  //    "model": "gpt-4o-mini",
  //    "messages": [{"role": "user", "content": "Say this is a test!"}],
  //    "temperature": 0.7
  //  }'

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });
  const resData = await res.json();
  console.log(">>resData", resData);

  return resData;
};
