import { motion } from "framer-motion";

const FooterWave = () => {
    return (
        <div className="absolute bottom-10 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
            <motion.svg
                className="relative block w-[200%] h-[100px] md:h-[150px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="fill-none stroke-red stroke-[2] opacity-30"
                ></path>
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="fill-none stroke-red stroke-[1] opacity-50"
                    transform="translate(0, 10)"
                ></path>
            </motion.svg>

            {/* Second wave for more complexity */}
            <motion.svg
                className="absolute bottom-0 left-0 w-[200%] h-[100px] md:h-[150px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                animate={{
                    x: ["-50%", "0%"],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ opacity: 0.4 }}
            >
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className="fill-none stroke-red stroke-[1]"
                ></path>
            </motion.svg>
        </div>
    );
};

export default FooterWave;
