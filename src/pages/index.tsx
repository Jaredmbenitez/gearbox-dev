import { type NextPage } from "next";
import Head from "next/head";
import GameGrid from "../components/GameGrid";
import type { Game } from "@prisma/client";

const Home: NextPage<{ games: Game[] }> = ({ games }) => {
    return (
        <>
            <Head>
                <title>Gearbox Dev Test</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Welcome to the gearbox dev test</h1>
                <GameGrid games={games} />
            </main>
        </>
    );
};

export default Home;
// Fetch games on Server before page load.
export async function getServerSideProps() {
    const res = await fetch("https://https://gearbox-dev.vercel.app/api/games");
    const games = await res.json();
    return {
        props: {
            games,
        },
    };
}
