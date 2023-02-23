import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

const root = document.getElementById('app');

export const Bookmark = () => {
  root.innerHTML = `
        <h1>Bookmarks</h1>
    `;
};
