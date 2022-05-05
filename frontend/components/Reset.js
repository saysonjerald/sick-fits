import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await reset();
    resetForm();
  }

  return (
    <Form
      method="POST"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h2>Reset your password</h2>
      <Error error={error || successfulError} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link</p>
        )}
        <label htmlFor="emailReset">
          Email
          <input
            type="email"
            name="email"
            id="emailResetNow"
            autoComplete="email"
            placeholder="Your email address"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="passwordReset">
          Email
          <input
            type="password"
            name="password"
            id="passwordReset"
            autoComplete="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
