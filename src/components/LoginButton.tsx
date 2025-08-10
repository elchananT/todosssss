import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import { FaUserSecret } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ mediaQuery, textQuery, icon }: { mediaQuery?: string, textQuery?: string, icon: boolean }) => {
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
    const navigate = useNavigate();

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipple(null);
        setTimeout(() => {
            setRipple({ x, y });
        }, 0);
    };

    const handleMouseLeave = () => {
        setRipple(null);
    };

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`relative overflow-hidden flex justify-between items-center gap-2 text-white px-4 py-2 bg-blue-950 rounded-2xl max-md:w-1/4 ${mediaQuery ? mediaQuery : ""}`}
            whileHover={{ backgroundColor: "rgb(55 65 81)" }}
            transition={{ duration: 0.3 }}
        >
            <span className={`${icon ? "" : "max-sm:hidden"}`}>
                <FaUserSecret />
            </span>
            <span className={`font-semibold ${textQuery ? textQuery : ""}`}>Log in</span>

            <AnimatePresence>
                {ripple && (
                    <motion.span
                        initial={{
                            opacity: 0.6,
                            scale: 0,
                            left: ripple.x,
                            top: ripple.y,
                        }}
                        animate={{
                            opacity: 0.3,
                            scale: 30,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeOut" }} // הארכתי ל-3 שניות
                        className="absolute bg-gray-500 rounded-full pointer-events-none"
                        style={{
                            width: 200,
                            height: 200,
                            marginLeft: -100,
                            marginTop: -100,
                            position: "absolute",
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}
export default LoginButton
