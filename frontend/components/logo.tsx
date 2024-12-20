import { Orbitron } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export function Logo() {
  return (
    <h1
      className={`text-2xl font-bold text-gray-800 dark:text-gray-50 ${orbitron.className}`}
    >
      heystock
    </h1>
  );
}
