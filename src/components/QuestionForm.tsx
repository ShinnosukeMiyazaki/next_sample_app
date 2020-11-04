import { useState, FormEvent } from "react";
import styled from "styled-components";

import firebase from "firebase/app";

const SubmitButton = styled.button`
  display: block;
  width: 200px;
  margin: 30px auto;
  background-color: #3498db;
  border-radius: 5px;
  padding: 15px 0px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
`;

export default function QuestionForm({ user }) {
  const [body, setBody] = useState("");

  //ボタン連打を禁止するために送信中かどうかのフラグ
  const [isSending, setIsSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSending(true);
    await firebase.firestore().collection("questions").add({
      senderUid: firebase.auth().currentUser.uid,
      receuverUid: user.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSending(false);
    setBody("");
    alert("質問を送信しました。");
  }
  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <textarea
        style={{
          width: "100%",
          marginTop: "40px",
          padding: "20px",
          fontSize: "1.6rem",
          resize: "none",
        }}
        placeholder="とっておきの質問を入力"
        rows={6}
        required
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      {isSending ? (
        <div>Loading ...</div>
      ) : (
        <SubmitButton type="submit">質問を送信する</SubmitButton>
      )}
    </form>
  );
}
