import Editor, { useMonaco, loader } from '@monaco-editor/react';
import { useRef, useState } from 'react';

function CodeEditor({ options, setCode }) {

    const [value, setValue] = useState('');

    const editorRef = useRef();

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const handleEditorChange = (value) => {
        setValue(value);
        setCode(value);
    }

    return (
        <div>
            <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                {options}
            </div>
            <Editor onMount={onMount} height="75vh" width="100%" theme='vs-dark' language={options.toLowerCase()} value={value} onChange={handleEditorChange} />
        </div>
    )
}

export default CodeEditor