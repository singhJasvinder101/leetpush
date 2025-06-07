import { useState, useEffect } from 'react'

import './Popup.css'
import { loginWithGitHub } from '../../utils/githubAuth';

function GitHubLoginButton() {
  const handleLogin = async () => {
    try {
      const { token, username } = await loginWithGitHub();
      alert(`Welcome ${username}`);
    } catch (err) {
      console.log(err)
      alert('GitHub login failed.');
    }
  };

  return <button onClick={handleLogin}>Connect GitHub</button>;
}

export const Popup = () => {  

  return (
    <main>
      <h3>Popup Page</h3>
      <GitHubLoginButton />
    </main>
  )
}

export default Popup
