import React, { useState, useEffect, useRef } from 'react';
import { KeyboardReactInterface } from 'react-simple-keyboard';

import * as styles from './Login.module.scss';

import { ReactComponent as HiddenIcon } from '@/assets/hidden.svg';
import { ReactComponent as VisibleIcon } from '@/assets/visible.svg';
import { Input, Button, KeyboardWrapper } from '@/components';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const keyboardRef = useRef<KeyboardReactInterface>(null);
  const [focusedField, setFocusedField] = useState<
    'username' | 'password' | null
  >(null);

  useEffect(() => {
    if (focusedField === 'username') {
      keyboardRef.current?.setInput(username);
    } else if (focusedField === 'password') {
      keyboardRef.current?.setInput(password);
    }
  }, [username, password, focusedField]);

  function validateInputs(password: string): string | null {
    if (!password.trim() || !username.trim())
      return 'Input fields cannot be empty';

    return null;
  }

  function handleSubmit() {
    setInputError(validateInputs(password));
    console.info('Login:', { username, password });
  }

  function togglePassword() {
    setIsVisible((state) => !state);
  }

  return (
    <div className={styles.login}>
      <h1>User Login</h1>
      <div className={styles.wrapper}>
        <div className={styles.loginForm}>
          <span className={styles.label}>Username:</span>
          <Input
            value={username}
            onChange={setUsername}
            label="Username"
            onFocus={() => setFocusedField('username')}
          />
          <span className={styles.label}>Password:</span>
          <div className={styles.password}>
            <Input
              value={password}
              onChange={setPassword}
              label="Password"
              visible={isVisible}
              onFocus={() => setFocusedField('password')}
            />
            <Button
              onClick={togglePassword}
              icon={isVisible ? VisibleIcon : HiddenIcon}
            />
          </div>
          <Button onClick={handleSubmit}>Sign In</Button>
        </div>
        <span className={styles.inputError}>{inputError}</span>
        <KeyboardWrapper
          onChange={(input: string) => {
            if (focusedField === 'username') setUsername(input);
            if (focusedField === 'password') setPassword(input);
          }}
          keyboardRef={keyboardRef}
        />
      </div>
    </div>
  );
}
