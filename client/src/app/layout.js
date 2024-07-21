import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/layouts/navbar";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Todo",
	description: "A modern todo manager",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={cn(
					"bg-background font-sans antialiased",
					fontSans.variable
				)}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
