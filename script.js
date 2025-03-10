'use strict';

const nameInput = document.querySelector("#name");
const numInput = document.querySelector("#number");
const btn = document.querySelector("button");
const contactList = document.querySelector("section");
const apiURL = "https://67cd2008dd7651e464ed6d76.mockapi.io/api/users";

async function fetchContacts() {
    let response = await fetch(apiURL);
    let contacts = await response.json();
    renderContacts(contacts);
}

let a = 1;

function renderContacts(contacts) {
    contactList.innerHTML = "";
    a = 1
    contacts.forEach(contact => {
        let contactItem = document.createElement("div");
        contactItem.classList.add("contact-item");
        contactItem.innerHTML = `
            <p>${a}</p>
            <p><strong>${contact.name}</strong></p>
            <p>${contact.number}</p>
            <button onclick="editContact(${contact.id})">Edit ✂</button>
            <button onclick="deleteContact(${contact.id})">Delete 🗑</button>
        `;
        contactList.appendChild(contactItem);
        a++
    });
}

btn.addEventListener("click", async () => {
    let response = await fetch(apiURL);
    let contacts = await response.json();

    if (nameInput.value != "" || numInput.value != "") {
        let newContact = {
            name: nameInput.value,
            number: numInput.value
        };

        await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        });
        fetchContacts();
    } else {
        alert("У вас пусто имя и номер");
    }
});

async function editContact(id) {
    let newName = prompt("Enter new name:");
    let newNumber = prompt("Enter new number:");
    if (!newName || !newNumber) return;

    await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, number: newNumber })
    });
    fetchContacts();
}

async function deleteContact(id) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    fetchContacts();
}

document.addEventListener("DOMContentLoaded", fetchContacts);
