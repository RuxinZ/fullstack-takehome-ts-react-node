import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import WS_URL from '../WS_URL';
import './Login.css';
interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const [username, setUsername] = useState<string>('');

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false,
  });

  function logInUser() {
    if (!username.trim()) {
      return;
    }
    onLogin && onLogin(username); // Triggers sendJsonMessage in App
  }

  // Rest of the component code...

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <p className="account__intro">Sign in to edit the document</p>
          </div>
          <label className="account__label" htmlFor="username">
            Username:{' '}
          </label>
          <input
            name="username"
            type="text"
            id="username"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="form-control"
          />
          <button
            type="button"
            onClick={() => logInUser()}
            className="btn btn-primary account__btn"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
