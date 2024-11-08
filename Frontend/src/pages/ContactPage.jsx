import { useState } from "react";
import styles from "./css/contactpage.module.css";
import arrow from "/icons/arrow-right-line.svg";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !phone || !message) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length < 10 || phone.length > 15) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (message.length < 10) {
      alert("Message must be at least 10 characters long.");
      return;
    }

    setIsSubmitting(true);

    const dataSend = { name, email, phone, message, };

    try {
      const res = await fetch(`https://codesphere-backend.vercel.app/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
      );

      if (res.status >= 200 && res.status < 300) {
        alert("Email sent successfully");
        setMessageReceived(true);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
      } else {
        throw new Error(`Failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send the email. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessageReceived(false), 3000);
    }
  };

  return (
    <div
      className={`h-screen bg-[#05071a] mb-[300px] text-white flex justify-center items-center gap-40 font-['Exo'] pt-28 ${styles.background}`}
    >
      <div className="p-10 flex justify-center items-center flex-col w-[540px] text-center">
        <div className="font-['LexendMega'] text-4xl uppercase font-bold">
          <div className="tracking-widest">Contact</div>
          <div className="font-light font-['Catamaran'] tracking-widest text-xs my-10">
            Feel free to contact us any time. We will get back to you as soon as
            we can!!!
          </div>
        </div>
        <div>
          <div className="mb-1 font-bold tracking-widest">Address</div>
          <div className="font-thin tracking-wider">
            KIIT University, Bhubneswar
          </div>
        </div>
        <div>
          <div className="mb-1 font-bold tracking-widest mt-9">Phone</div>
          <div className="font-thin tracking-wider">+91 7061716587</div>
        </div>
        <div>
          <div className="mb-1 font-bold tracking-widest mt-9">Email</div>
          <div className="font-thin tracking-wider">
            kaushikverma321@gmail.com
          </div>
        </div>
      </div>
      <div className="py-10 flex justify-center items-center w-[460px] shadow-[0px_35px_50px_4px_rgba(0,0,0,1)]">
        <form className="w-full" action="" onSubmit={sendEmail}>
          <div className="font-['LexendMega'] text-3xl uppercase font-bold text-center mb-5">
            Contact Form
          </div>
          <div className="px-12">
            <label htmlFor="name"></label>
            <input
              className="bg-transparent border-b-2 p-4 w-full border-zinc-700 outline-none"
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div className="px-12">
            <label htmlFor="phone"></label>
            <input
              className="bg-transparent border-b-2 p-4 w-full border-zinc-700 outline-none"
              type="number"
              name="phone"
              id="phone"
              placeholder="Your Phone"
            />
          </div>
          <div className="px-12">
            <label htmlFor="email"></label>
            <input
              className="bg-transparent border-b-2 p-4 w-full border-zinc-700 outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Your E-Mail"
            />
          </div>
          <div className="px-12">
            <label htmlFor="message"></label>
            <input
              className="bg-transparent border-b-2 p-4 w-full border-zinc-700 outline-none"
              type="text"
              name="message"
              id="message"
              placeholder="Your Message"
            />
          </div>
          <div className="px-12">
            <button
              className={`p-3 font-['Exo'] mt-6 shadow-[13px_13px_40px_5px_rgba(0,0,0,1)] flex justify-center items-center gap-1 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : messageReceived
                  ? "Message Received"
                  : "Send Message"}
              {!isSubmitting && !messageReceived && (
                <img
                  className="w-5 relative top-[1.2px]"
                  src={arrow}
                  alt="Right Arrow"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
