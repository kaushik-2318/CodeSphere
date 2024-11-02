import Editor from '@monaco-editor/react';
import { useRef, useState,useEffect } from 'react';

function CodeEditor({ options, setCode, setHasErrors }) {

    const [value, setValue] = useState('');

    const editorRef = useRef();

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const handleEditorChange = (value) => {
        setValue(value);
        setCode(value);
        checkForErrors();
    }

    const checkForErrors = () => {
        const markers = editorRef.current
            ? monaco.editor.getModelMarkers({ owner: editorRef.current.getModel().getLanguageId() })
            : [];
        const hasErrors = markers.some(marker => marker.severity === monaco.MarkerSeverity.Error);
        setHasErrors(hasErrors);
    };

    useEffect(() => {
        if (editorRef.current) {
            checkForErrors();
        }
    }, [value]);

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