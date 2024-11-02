import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);

function Header() {
  const desc =
    "Create stunning professional quality websites in record time with our UI kiit.";

  useGSAP(() => {
    var tl = gsap.timeline();
    tl.from(".headeranimation", {
      y: -500,
      duration: 1,
      stagger: 0.5,
    });

    tl.from(".word", {
      opacity: 0,
      y: 50,
      stagger: 0.04,
      ease: "power1.out",
    });
  });

  return (
    <>
      <div className="h-screen font-['Sora'] flex justify-center items-center flex-col text-white">
        <div className="overflow-hidden">
          <div className="text-center text-7xl">
            <div className="overflow-hidden">
              <p className="headeranimation">
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-[rgb(236,75,125)] to-[hsl(242,66%,60%)]`}
                >
                  Revolutionze
                </span>{" "}
                your digital
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="headeranimation">products with us.</p>
            </div>
          </div>
        </div>
        <div className="pt-10 overflow-hidden text-lg font-thin">
          {desc.split(" ").map((word, index) => (
            <span key={index} className="word">
              {word + " "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
