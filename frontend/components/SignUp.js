import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup();
    resetForm();
  }

  return (
    <Form
      method="POST"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h2>Register an account here</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Sign up with {data.createUser.email} - Please go ahead and sign in
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            id="name"
            autoComplete="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="emailSignUp">
          Email
          <input
            type="email"
            name="email"
            id="emailSignUp"
            autoComplete="email"
            placeholder="Your email address"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="passwordSignUp">
          Password
          <input
            type="password"
            name="password"
            id="passwordSignUp"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
