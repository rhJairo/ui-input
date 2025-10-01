import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, KeyboardWrapper } from '@/components';
import { ReactComponent as VisibleIcon } from '@/assets/visible.svg';
import { ReactComponent as HiddenIcon } from '@/assets/hidden.svg';
import { KeyboardReactInterface } from 'react-simple-keyboard';
import * as styles from './Login.module.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);
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

  function handleSubmit() {
    console.log('Login:', { username, password });
  }

  function togglePassword() {
    setIsVisible((state) => !state);
  }

  return (
    <div className={styles.login}>
      <h1>User Login</h1>
      <div className={styles.wrapper}>
        <div className={styles.loginForm}>
          <Input
            value={username}
            onChange={setUsername}
            placeholder="Username"
            onFocus={() => setFocusedField('username')}
          />
          <div className={styles.password}>
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Password"
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
