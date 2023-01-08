import Image from 'next/image';
import { Game } from '@prisma/client';
import Swal from 'sweetalert2';
export default function GameCard(props: any) {
    const discountedPrice = Math.round(props.price * (1 - props.discount / 100));

    const handleDeleteGame = (id: number) => {
        fetch(`/api/games/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => {
            props.setExistingGames(props.existingGames.filter((game: Game) => game.id !== id));
        });
    };
    const handleEditGame = (id: number) => {

        Swal.fire({
            title: 'Edit Game',
            html: `
            <div class="flex flex-col">
                <label for="swal-input1">Name</label>
                <input id="swal-input1" class="swal2-input" placeholder="Game Name" value="${props.existingGames.find((game: Game) => game.id === id)?.name}">
            </div>
            <div class="flex flex-col">
                <label for="swal-input2">Genre</label>
                <select id="swal-input2" class="swal2-input" placeholder="Game Genre" value="${props.existingGames.find((game: Game) => game.id === id)?.genre}">
                    <option value="Adventure">Adventure</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Role Playing Game">Role Playing Game</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Platformer">Platformer</option>
                </select>

            </div>
            <div class="flex flex-col">
                <label for="swal-input3">Rating</label>
                <input id="swal-input3" class="swal2-input" placeholder="Game Rating" value="${props.existingGames.find((game: Game) => game.id === id)?.rating}">
            </div>
            <div class="flex flex-col">
                <label for="swal-input4">Price</label>
                <input id="swal-input4" class="swal2-input" placeholder="Game Price" value="${props.existingGames.find((game: Game) => game.id === id)?.price}">
            </div>
            <div class="flex flex-col">
                <label for="swal-input5">Discount</label>
                <input id="swal-input5" class="swal2-input" placeholder="Game Discount" value="${props.existingGames.find((game: Game) => game.id === id)?.discount}">
            </div>
            <div class="flex flex-col">
                <label for="swal-input6">Release Date</label>
                <input id="swal-input6" class="swal2-input" placeholder="Game Release Date" value="${props.existingGames.find((game: Game) => game.id === id)?.releaseDate}">
            </div>
            <div class="flex flex-col">
                <label for="swal-input7">Image URL</label>
                <input id="swal-input7" class="swal2-input" placeholder="Game Image URL" value="${props.existingGames.find((game: Game) => game.id === id)?.image_url}">
            </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    (document.getElementById('swal-input1') as HTMLInputElement).value,
                    (document.getElementById('swal-input2') as HTMLInputElement).value,
                    (document.getElementById('swal-input3') as HTMLInputElement).value,
                    (document.getElementById('swal-input4') as HTMLInputElement).value,
                    (document.getElementById('swal-input5') as HTMLInputElement).value,
                    (document.getElementById('swal-input6') as HTMLInputElement).value,
                    (document.getElementById('swal-input7') as HTMLInputElement).value,
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                //The below line would cause issues with the fetch request because the values are potentially undefined
                //This is related to typescript, and the source of the change to the next.config.mjs file.
                const [name, genre, rating, price, discount, releaseDate, image_url] = result.value;
                fetch(`/api/games/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        genre,
                        rating: parseInt(rating),
                        price: parseInt(price),
                        discount: parseInt(discount),
                        releaseDate: new Date(releaseDate).toISOString(),
                        image_url
                    })
                }).then((res) => res.json()).then((data) => {
                    //Update the record in the existing games array
                    props.setExistingGames(props.existingGames.map((game: Game) => {
                        if (game.id === id) {
                            return data;
                        } else {
                            return game;
                        }
                    }
                    ));
                });
            }
        });
    };
    return (
        <div className="max-w-sm rounded  max-h-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="relative h-48 w-full">
                <Image src={props.image_url} alt={props.name} fill />
            </div>
            {props.discount > 0 && (
                <div className="bg-red-500 text-white text-xs font-bold uppercase tracking-wide text-center py-1">
                    {props.discount}% off
                </div>
            )}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    Genre: {props.genre}
                </p>
                <p className="text-gray-700 text-base">
                    Rating: {Array.from({ length: props.rating }, (_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                    ))}
                </p>
            </div>
            <div className="px-6 py-2">
                {props.discount ? (
                    <>
                        <s className="text-gray-600">${props.price}</s>
                        <span className="text-red-500 ml-2">${discountedPrice}</span>
                    </>
                ) : (
                    <span className="text-gray-700">${props.price}</span>
                )}
            </div>
            <div className="px-6 ">
                <p className="text-gray-700 text-base">
                    Release Date:
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {new Date(props.releaseDate).toLocaleDateString()}
                    </span>
                </p>
            </div>
            {props.adminMode && (
                <div className="px-6 py-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleEditGame(props.id)}>
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleDeleteGame(props.id)} >
                        Delete
                    </button>
                </div>
            )
            }
        </div >
    )
}

