import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from "react-query"

const inter = Inter({ subsets: ["latin"] })

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={inter.className}>
			<QueryClientProvider client={client}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</main>
	)
}
