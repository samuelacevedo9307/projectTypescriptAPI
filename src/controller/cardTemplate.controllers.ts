export class CardTemplateController {
    public containerBooks: HTMLDivElement;
    constructor(containerUsers: HTMLDivElement) {
        this.containerBooks = containerUsers;
    }
    render(id: string, title: string, author: string, description: string, summary: string, publicationDate: string): void {
        const figure = document.createElement("figure");
        figure.classList.add("card", "col-4")

        const h2 = document.createElement("h2");
        h2.classList.add("card-title", "text-center");
        h2.textContent = title
        figure.appendChild(h2)

        const h4 = document.createElement("h4");
        h4.classList.add("card-title", "text-center");
        h4.textContent = author;
        figure.appendChild(h4)

        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("card-body", "bg-light", "text-dark");
        figure.appendChild(figcaption)

        const h5 = document.createElement("h5");
        h5.classList.add("card-title", "text-center");
        h5.textContent = description;
        figure.appendChild(h5)

        const p = document.createElement("p");
        p.classList.add("card-text", "text-center");
        p.textContent = summary;
        figure.appendChild(p)

        const h6 = document.createElement("h6");
        h6.classList.add("card-text", "text-center");
        h6.textContent = publicationDate;
        figure.appendChild(h6)

        const div = document.createElement("div");
        div.classList.add("d-flex");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.textContent = "Edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;

        const btnDelete = document.createElement("button");
        btnEdit.classList.add("btn", "btn-danger");
        btnEdit.textContent = "Delete";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;

        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        figcaption.appendChild(div);

        this.containerBooks.appendChild(figure)
    }
}