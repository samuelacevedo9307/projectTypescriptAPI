import { UsersController } from "./controller/controllers.users";

const URL_USERS: string = "http://190.147.64.47:5155";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const crudUsers = new UsersController(URL_USERS);
    const responseUser = await crudUsers.Login(email, password);
    const token: string | null = responseUser.data.token;

    if (token) {
        console.log(`login ${token}`);
        localStorage.setItem('authToken', token);
        window.location.href = "books.html";
    } else {
        console.log("Failed Login");
    }
    form.reset();
});
