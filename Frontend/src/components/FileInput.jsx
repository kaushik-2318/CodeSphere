import { color } from 'framer-motion';
import { useState } from 'react';

function FileUpload() {
    const [files, setFiles] = useState({});
    const [counter, setCounter] = useState(0);
    const [draggedOver, setDraggedOver] = useState(false);

    const hasFiles = (types = []) => types.indexOf('Files') > -1;

    const addFile = (file) => {
        const objectURL = URL.createObjectURL(file);
        const isImage = file.type.match('image.*');
        const newFile = {
            id: objectURL,
            name: file.name,
            size:
                file.size > 1024
                    ? file.size > 1048576
                        ? Math.round(file.size / 1048576) + 'mb'
                        : Math.round(file.size / 1024) + 'kb'
                    : file.size + 'b',
            src: isImage ? objectURL : null,
            type: isImage ? 'image' : 'file',
        };
        setFiles((prevFiles) => ({ ...prevFiles, [objectURL]: newFile }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDraggedOver(false);
        setCounter(0);
        const droppedFiles = e.dataTransfer.files;
        for (const file of droppedFiles) {
            addFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (hasFiles(e.dataTransfer.types)) {
            setDraggedOver(true);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        if (!hasFiles(e.dataTransfer.types)) return;
        setCounter((prevCounter) => prevCounter + 1);
        setDraggedOver(true);
    };

    const handleDragLeave = () => {
        setCounter((prevCounter) => (prevCounter - 1 <= 0 ? 0 : prevCounter - 1));
        if (counter <= 1) setDraggedOver(false);
    };

    const handleFileInput = (e) => {
        const selectedFiles = e.target.files;
        for (const file of selectedFiles) {
            addFile(file);
        }
    };

    const handleDelete = (fileId) => {
        setFiles((prevFiles) => {
            const newFiles = { ...prevFiles };
            delete newFiles[fileId];
            return newFiles;
        });
    };

    return (
        <div className="sm:px-8 md:px-5 w-full sm:py-4 mt-10">

            <main className="container max-w-screen-lg h-[75vh]">

                <article aria-label="File Upload Modal" className="h-full flex flex-col bg-[#27272a] shadow-xl rounded-md" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}  >

                    <div className='sm:px-4 md:px-8 pt-5'>
                        If you want to attach Source Code File, you can do it here...
                    </div>

                    <section className="h-full p-7 w-full flex flex-col ">
                        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                            <p className="font-semibold text-gray-400 flex flex-wrap justify-center">
                                <span>Drag and drop your</span>&nbsp;
                                <span>files anywhere or</span>
                            </p>
                            <input id="hidden-input" type="file" multiple className="hidden" onChange={handleFileInput} />
                            
                            <button
                                id="button"
                                className="mt-2 rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-800 focus:shadow-outline focus:outline-none"
                                onClick={() => document.getElementById('hidden-input').click()}
                            >
                                Upload a file
                            </button>
                        </header>

                        <h1 className="py-3 font-semibold sm:text-lg text-gray-400 font-['Exo']">
                            To Upload
                        </h1>

                        <ul id="gallery" className="flex flex-wrap overflow-y-auto h-full w-full p-1 gap-5">
                            {Object.keys(files).length === 0 ? (
                                <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                    <span className="text-small text-gray-500">
                                        No files selected
                                    </span>
                                </li>
                            ) : (
                                Object.values(files).map((file) => (
                                    <li key={file.id} className="block w-24 h-24">
                                        <article className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-black cursor-pointer relative shadow-sm">

                                            {file.type === 'image' && (
                                                <img alt="upload preview" className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" src={file.src} />
                                            )}

                                            <section className="flex flex-col rounded-md text-xs break-words w-24 h-24 z-20 absolute top-0 py-2 px-1">
                                                <h1 className="flex-1">{file.name}</h1>

                                                <div className="flex items-center w-full">
                                                    <span className="text-blue-800">
                                                        <i>
                                                            <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                                            </svg>
                                                        </i>
                                                    </span>
                                                    <p className="size text-xs px-1 pt-[0.7px]" style={file.type === 'image' ? { color: 'white' } : { color: 'black' }}>
                                                        {file.size}
                                                    </p>
                                                    <button className="delete ml-auto focus:outline-none rounded-md pl-1" onClick={() => handleDelete(file.id)}>
                                                        <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                                            <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.731 2 1.632 2h5.71z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </section>
                                        </article>
                                    </li>
                                ))
                            )}
                        </ul>
                    </section>
                </article>
            </main>
        </div>
    );
}

export default FileUpload;
