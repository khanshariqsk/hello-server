import React, { useState, useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";

interface JsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value = "{}", onChange }) => {
  const [jsonData, setJsonData] = useState(value);
  const editorRef = useRef<any>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setJsonData(value);
      if (onChange) onChange(value);
    }
  };

  // Define a Custom Light Theme with Background for Active Editing
  const defineCustomTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("custom-json-light", {
      base: "vs", // Light theme base
      inherit: true,
      rules: [
        { token: "string.key.json", foreground: "#AA5500", fontStyle: "bold" }, // JSON keys (dark orange)
        { token: "string.value.json", foreground: "007ACC" }, // JSON string values (blue)
        { token: "number.json", foreground: "#098658" }, // JSON numbers (dark green)
        { token: "keyword.json", foreground: "#D91E18", fontStyle: "bold" }, // JSON booleans/null (red)
        { token: "operator.json", foreground: "#333333" }, // Curly braces, colons, and commas (dark gray)
      ],
      colors: {
        "editor.background": "#FFFFFF", // White background for light theme
        "editor.foreground": "#000000", // Black text for better contrast
        "editorLineNumber.foreground": "#666666", // Line numbers in gray
        "editorCursor.foreground": "#D91E18", // Red cursor for better visibility
        "editor.selectionBackground": "#F5F5F5", // Light gray background when selecting
        "editor.selectionHighlightBackground": "#FFD580", // Light yellow when editing (input mode)
        "editor.lineHighlightBackground": "#F0F0F0", // Slight highlight for active line
      },
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Editor
        defaultLanguage="json"
        value={jsonData}
        onChange={handleEditorChange}
        beforeMount={defineCustomTheme} // Define theme before mounting
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monaco.editor.setTheme("custom-json-light"); // Apply the custom light theme
        }}
        options={{
          minimap: { enabled: false }, // Hide minimap for a cleaner look
          automaticLayout: true,
          wordWrap: "on",
          fontSize: 14,
          scrollBeyondLastLine: false,
          renderLineHighlight: "all", // Highlight the current line
          cursorBlinking: "smooth", // Smooth cursor animation
          selectionHighlight: true, // Enable selection background color
        }}
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default JsonEditor;
