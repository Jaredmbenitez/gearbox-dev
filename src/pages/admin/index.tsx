import { type NextPage } from "next";
import GameGrid from "../../components/GameGrid";
import AddGameForm from "../../components/AddGameForm";
import type { Game } from "@prisma/client";
const Admin: NextPage<{ games: Game[] }> = ({ games }) => {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center ">
                <div className="grid-cols-1 grid">
                    <GameGrid games={games} adminMode={true} />
                    <div className="h-10 bg-gray-100"></div>
                    <AddGameForm />
                    <div className="h-10 bg-gray-100"></div>
                </div>
            </main>
        </>
    );
};

export default Admin;
// Fetch games on Server before page load.
export async function getServerSideProps() {
    const res = await fetch("https://gearbox-dev.vercel.app/api/games");
    const games = await res.json();
    return {
        props: {
            games,
        },
    };
}
