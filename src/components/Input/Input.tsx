import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as styles from './Input.module.scss';

export interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  visible?: boolean;  
  onFocus?: () => void;
}

export default function Input({
  value,
  onChange,
  placeholder,
  visible = true,
  onFocus,
}: InputProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealActive, setRevealActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const maskChar = '•';
  const revealMs = 1000;

  const textDisplayed = (plainText: string) => {
    if (visible) return plainText;
    if (!plainText.length) return '';
    if (revealActive) {
      return maskChar.repeat(plainText.length - 1) + plainText.slice(-1);
    }
    return maskChar.repeat(plainText.length);
  };

  useEffect(() => {
    const inputRef = ref.current;
    if (!inputRef) return;
    const display = textDisplayed(value);
    if (inputRef.textContent !== display) {
      inputRef.textContent = display;
      placeCaretAtEnd(inputRef);
    }
  }, [value, visible, revealActive]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startRevealTimer = () => {
    if (visible) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealActive(true);
    timerRef.current = window.setTimeout(() => {
      setRevealActive(false);
    }, revealMs);
  };

  function placeCaretAtEnd(el: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  const handleBeforeInput = (e: React.InputEvent<HTMLDivElement>) => {
    const ev = e.nativeEvent;
    const type = ev.type;

    e.preventDefault();

    if (type === 'textInput') {
      const text = ev.data ?? '';
      if (text) {
        onChange(value + text);
        startRevealTimer();
      }
      return;
    }

    if (type === 'deleteContentBackward') {
      if (value.length) {
        onChange(value.slice(0, -1));
        setRevealActive(false);
      }
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (value.length) {
        onChange(value.slice(0, -1));
        setRevealActive(false);
      }
      return;
    }
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline={'false'}
      aria-label={placeholder}
      tabIndex={0}
      contentEditable
      suppressContentEditableWarning
      className={clsx(styles.input)}
      data-placeholder={placeholder}
      onBeforeInput={handleBeforeInput}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
    />
  );
}
