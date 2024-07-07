const toggleButton = document.getElementById("toggleButton");
const sidebar = document.getElementById("left_block");
const content = document.getElementById("right_block");

toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("left_block_hidden");
    content.classList.toggle("right_block_expanded");
});