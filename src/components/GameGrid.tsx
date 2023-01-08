//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import GameCard from './GameCard';
import { useState } from 'react';
export default function GameGrid(props: { games: Game[], adminMode?: boolean }) {

    const [existingGames, setExistingGames] = useState(props.games);
    const [genreFilter, setGenreFilter] = useState("All");
    const [ratingFilter, setRatingFilter] = useState("All");
    const [pageNumber, setPageNumber] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenreFilter(event.target.value);
        setPageNumber(1); // reset page number when genre is changed
    }
    const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRatingFilter(event.target.value);
        setPageNumber(1); // reset page number when rating is changed
    }
    const handleNextButtonClick = () => {
        setPageNumber(pageNumber + 1);
    }

    const handlePrevButtonClick = () => {
        setPageNumber(pageNumber - 1);
    }


    const filteredGames = existingGames.filter((game: Game) => {
        if (genreFilter === "All" && ratingFilter === "All") {
            return true;
        } else if (genreFilter === "All") {
            return game.rating === parseInt(ratingFilter);
        } else if (ratingFilter === "All") {
            return game.genre === genreFilter;
        } else {
            return game.genre === genreFilter && game.rating === parseInt(ratingFilter);
        }
    });
    const lastGameIndex = pageNumber * gamesPerPage;
    const firstGameIndex = lastGameIndex - gamesPerPage;
    const currentPageGames = filteredGames.slice(firstGameIndex, lastGameIndex);

    return (
        <div className="mx-4 my-4">
            <h2 className="text-2xl font-bold text-center">Games</h2>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Genre</label>
                <select
                    className="border border-gray-300 rounded-md p-2"
                    value={genreFilter}
                    onChange={handleGenreChange}
                >
                    <option value="All">All</option>
                    <option value="Fighting">Fighting Game</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Role Playing Game">Role Playing Game</option>
                    <option value="Adventure">Adventure</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Rating</label>
                <select className="border border-gray-300 rounded-md p-2"
                    value={ratingFilter}
                    onChange={handleRatingChange}
                >
                    <option value="All">All</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>
            </div>
            <div className="h-10 bg-gray-100 my-2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* No Games found if the filtered games array is empty */}
                {filteredGames.length === 0 && <div className="text-xl font-bold">No Games Found</div>}
                {filteredGames.length !== 0 && currentPageGames.map((game: Game) => (
                    <GameCard
                        key={game.id}
                        {...game}
                        adminMode={props.adminMode}
                        existingGames={existingGames}
                        setExistingGames={setExistingGames}
                    />
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    className="py-2 px-4 bg-gray-300 rounded-md"
                    disabled={pageNumber === 1}
                    onClick={handlePrevButtonClick}
                >
                    Previous
                </button>
                <span className="text-xl font-bold">{pageNumber}</span>
                <button
                    className="py-2 px-4 bg-gray-300 rounded-md"
                    disabled={lastGameIndex >= filteredGames.length}
                    onClick={handleNextButtonClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
