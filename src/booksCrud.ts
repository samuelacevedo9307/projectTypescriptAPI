import { BooksController } from "./controller/books.controlles.js";
import { CardTemplateController } from "./controller/cardTemplate.controllers.js";

const URL_BOOKS: string = "http://190.147.64.47:5155";

const btnLogOut = document.getElementById("btn-logout") as HTMLButtonElement;
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;
const token = localStorage.getItem("authToken");

let currentPage: number = 1;
const limit: number = 5;

btnLogOut.addEventListener("click", (e: Event) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html"
})

if (!token) {
    alert(`Authentication token is missing . please log in `);
    window.location.href = "login.html";
} else {
    const containerBooks = document.querySelector(".contaner-books") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;

    let idCatche: undefined | string;

    const cardTemplate = new CardTemplateController(containerBooks);

    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage--;
            await allBooks(limit, currentPage)
        }
    })

    nextPage.addEventListener("click", async (e: Event) => {
        console.log("here next page");
        console.log(currentPage);

        if (currentPage >= 1) {
            currentPage++;
            await allBooks(limit, currentPage)
        }
    })

    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        if (idCatche === undefined) {
            await crudBooks.create(title, author, description, summary, publicationDate, token as string);
        } else {
            await crudBooks.update(idCatche, title, author, description, summary, publicationDate, token as string);
            idCatche = undefined;
        }
        form.reset();
        await allBooks(limit, currentPage);
    })

    containerBooks.addEventListener("click", async (e: Event) => {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS)
            if (e.target.classList.contains("btn-warning")) {
                idCatche = e.target.dataset.id;
                if (idCatche) {
                    const book = await crudBooks.getById(idCatche, token as string)
                    title.value = book.data.tittle;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;

                }

            } else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;

                if (bookId) {
                    const confirmDelete = confirm("are you want to delete?");
                    if (confirmDelete) {
                        await crudBooks.delete(bookId, token as string);
                        idCatche = undefined;
                        await allBooks(limit, currentPage);
                    }
                }
            }
        }
    })
    async function allBooks(limit: number, currentPage: number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try {
            const response = await crudBooks.allBooks(token as string, limit, currentPage);
            console.log(`respuesta ${response}`);
            const books = response.data;

            containerBooks.innerHTML = '';

            for (const book of books) {
                cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
            }
        } catch (error) {

            console.error(`error${error}`);
        }
        allBooks(limit, currentPage);
    }
}
