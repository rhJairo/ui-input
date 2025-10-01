import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as styles from './Input.module.scss';
import { handleInputKeyDown } from './helper';

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
  const [caretIndex, setCaretIndex] = useState(value.length);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const revealMs = 1000;
  const maskChar = '•';
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Show last typed char
  useEffect(() => {
    if (!visible && value.length > 0) {
      const lastIndex = value.length - 1;
      setRevealIndex(lastIndex);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setRevealIndex(null);
      }, revealMs);
    } else {
      setRevealIndex(null);
    }
  }, [value, visible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderMasked = () => {
    if (visible) return value.split('');
    if (!value.length) return [];
    return value.split('').map((ch, i) => (revealIndex === i ? ch : maskChar));
  };

  const chars = renderMasked();

  return (
    <div
      ref={containerRef}
      role="textbox"
      aria-multiline="false"
      aria-label={placeholder}
      tabIndex={0}
      className={clsx(styles.input)}
      data-placeholder={placeholder}
      onKeyDown={(e) =>
        handleInputKeyDown(e, value, caretIndex, onChange, setCaretIndex)
      }
      onFocus={onFocus}
    >
      {chars.map((char, position) => (
        <span key={position}>
          {position === caretIndex ? <span className={styles.caret} /> : null}
          {char}
        </span>
      ))}
      {caretIndex === chars.length && <span className={styles.caret} />}
    </div>
  );
}
