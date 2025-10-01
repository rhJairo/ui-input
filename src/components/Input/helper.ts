
export function handleInputKeyDown(
  e: React.KeyboardEvent<HTMLDivElement>,
  value: string,
  caretIndex: number,
  onChange: (v: string) => void,
  setCaretIndex: (i: number) => void
) {
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    const newValue =
      value.slice(0, caretIndex) + e.key + value.slice(caretIndex);
    onChange(newValue);
    setCaretIndex(caretIndex + 1);
    return;
  }

  switch (e.key) {
    case 'Backspace':
      e.preventDefault();
      if (caretIndex > 0) {
        onChange(
          value.slice(0, caretIndex - 1) + value.slice(caretIndex)
        );
        setCaretIndex(caretIndex - 1);
      }
      break;
    case 'ArrowLeft':
      e.preventDefault();
      setCaretIndex(Math.max(0, caretIndex - 1));
      break;
    case 'ArrowRight':
      e.preventDefault();
      setCaretIndex(Math.min(value.length, caretIndex + 1));
      break;
    case 'Enter':
    case 'NumpadEnter':
      e.preventDefault();
      break;
  }
}
