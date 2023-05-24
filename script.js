import { initialFacts, CATEGORIES } from "./data.js";
import { apikey, authorization } from "./apikey.js";

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".facts-list");

// Clear list items
factList.innerHTML = "";

function createFactsList(dataArray) {
  // Create DOM elements
  const htmlArr = dataArray
    .map(
      (el) =>
        `
      <li class="fact" key=${el.id}>
        <p>
          ${el.text}
          <a class="source" href="${el.source}" target="_blank">
            (Source)
          </a>
        </p>
        <span class="tag" style="background-color:${
          CATEGORIES.find((cat) => cat.name === el.category)?.color
        }">${el.category}</span>
        <div class="vote-buttons">
          <button>👍 ${el.votesInteresting}</button>
          <button>🤯 ${el.votesMindblowing}</button>
          <button>⛔️ ${el.votesFalse}</button>
        </div>
      </li>`
    )
    .join("");
  factList.insertAdjacentHTML("afterbegin", htmlArr);
}

// Load data from API
async function loadFacts() {
  const res = await fetch(
    "https://utxzikzxlhahsjndxzhw.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey: `${apikey}`,
        authorization: `${authorization}`,
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}
loadFacts();

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
