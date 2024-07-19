import React, { useState } from 'react';
import '../styles/AccessPage.css';

const AccessPage: React.FC<{ onAccessGranted: () => void }> = ({ onAccessGranted }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessPassword = process.env.REACT_APP_ACCESS_PASSWORD;
    if (password === accessPassword) {
      onAccessGranted();
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="access-page">
      <form onSubmit={handleSubmit}>
        <h2>Access Page</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AccessPage;
