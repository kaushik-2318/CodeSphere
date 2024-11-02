import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types";

function Otp ({disable, onOtpSubmit}) {

  const [otp, setOtp] = useState(new Array(4).fill(""));

  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1)

    setOtp(newOtp)

    const combinedOtp = newOtp.join("");

    if (combinedOtp.length == 4) {
      onOtpSubmit(combinedOtp);
    }

    if (value && index < 4 - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

  }
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }

    if (index > 0 && !otp[index + 2]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  }


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  }

  return (
    <div>
      {
        otp.map((value, index) => {
          return (
            <input disabled={disable} key={index} type="text" ref={(input) => (inputRefs.current[index] = input)} value={value} onChange={(e) => handleChange(index, e)} onClick={() => handleClick(index)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-[40px] h-[40px] text-center m-[5px] text-[0.9em] rounded-md bg-[#1f2a37] outline-none hover:border-green-600 focus:border-green-600 border-[1px] p-2 rounded-r-md border-[#ffffff20] duration-500 disabled:cursor-not-allowed disabled:hover:border-[#1f2a37] disabled:focus:border-[#1f2a37]" />
          )
        })
      }
    </div>
  )
}

Otp.propTypes = {
  disable: PropTypes.bool,
  onOtpSubmit: PropTypes.func,
};


export default Otp