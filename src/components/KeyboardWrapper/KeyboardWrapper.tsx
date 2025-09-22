import React, {
  FunctionComponent,
  useState,
  useRef,
  RefObject,
} from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface KeyboardWrapperProps {
  onChange: (input: string) => void;
  keyboardRef?:  React.RefObject<KeyboardReactInterface | null> | null;
}

export const KeyboardWrapper: FunctionComponent<KeyboardWrapperProps> = ({
  onChange,
  keyboardRef
}) => {
  const [layoutName, setLayoutName] = useState<"default" | "shift">("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
    }
  };

  return (
    <Keyboard
      keyboardRef={(instance: KeyboardReactInterface | null) => {
        if (keyboardRef) {
          (keyboardRef as any).current = instance;
        }
      }}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default KeyboardWrapper;
