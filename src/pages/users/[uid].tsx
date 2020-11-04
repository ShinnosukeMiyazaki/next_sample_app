import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import firebase from "firebase/app";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Form from "../../components/QuestionForm";

type Query = {
  uid: string;
};
const TopWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export default function UserShow() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const query = router.query as Query;

  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    console.log(query.uid);
    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(query.uid)
        .get();

      if (!doc.exists) {
        return;
      }

      const getUser = doc.data() as User;
      getUser.uid = doc.id;
      setUser(getUser);
    }
    loadUser();
  }, [query.uid]);

  return (
    <Layout>
      {user && (
        <>
          <TopWrapper>
            <h4 style={{ fontSize: "2.2rem" }}>{user.name}さんのページ</h4>
            <div style={{ fontSize: "1.4rem" }}>
              {user.name}さんに質問しましょう!
            </div>
          </TopWrapper>
          <Form user={user} />
        </>
      )}
    </Layout>
  );
}
