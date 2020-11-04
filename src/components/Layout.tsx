import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  min-height: 600px;
  padding: 50px 20px;
  margin: 0 auto;
  background-color: rgba(52, 152, 219, 0.1);
`;

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
