import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 80px;
  width: 100%;
  position: fixed;
  padding: 0px 35px;
  display: flex;
  top: 0;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  cursor: pointer;
`;

export default function Header() {
  return (
    <Wrapper>
      <Link href="/">
        <Logo src="/logo.png" />
      </Link>
    </Wrapper>
  );
}
