import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ResetRequest from '../components/ResetRequest';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <SignIn />
      <SignUp />
      <ResetRequest />
    </GridStyles>
  );
}
