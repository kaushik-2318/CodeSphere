import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types';

function LanguageSelector({ options, set }) {

    const [panel, setPanel] = useState(false)

    const [value, setValue] = useState('')

    const panelRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setPanel(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [panelRef, inputRef]);


    return (
        <>
            <div >
                <div className="mt-2">
                    <input onClick={() => setPanel(!panel)} ref={inputRef} className="w-32 mt-2 duration-200 rounded-md p-2 disabled:bg-[#27272a] bg-[#27272a] border-none outline-none cursor-default" onChange={() => { }} value={value} type="text" placeholder='Choose' />
                </div>
                {
                    panel && (
                        <>
                            <div ref={panelRef} className="w-32 rounded-md bg-[#27272a] mt-1 border-[1px] border-slate-600">
                                {
                                    options.map((option, index) => {
                                        return (
                                            <>
                                                <div key={index} onClick={() => { setValue(option); setPanel(false); set(option); }} className="w-32 p-2 hover:bg-slate-400 rounded-md duration-200 cursor-default hover:text-black">
                                                    {option}
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                }
            </div>

        </>
    )
}

LanguageSelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default LanguageSelector
