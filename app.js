const d = document;
const $ = (e) => d.querySelector(e);

export const app = async () => {

    document.addEventListener("click", async (e) => {
        if (e.target.matches(".btn-close-modal")) {
            e.target.closest("dialog").close();
        }
    })

    let path = window.location.pathname.split(".")[0];

    if (path === "/index") {

    }
}