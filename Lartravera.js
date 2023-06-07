let chapter_boxes = document.getElementsByClassName("chapter");
for (let b of chapter_boxes) {b.addEventListener("click", function(e){toggleBoxChildren(b); e.stopPropagation();})}
let subchapter_boxes = document.getElementsByClassName("subchapter");
for (let b of subchapter_boxes) {b.addEventListener("click", function(e){toggleBoxChildren(b); e.stopPropagation();})}

function toggleBoxChildren(elem) {
    let childs = elem.children;
    for (let c of childs) {
        if (c.classList.contains("start_hide")) {
            if (getComputedStyle(c).getPropertyValue("display") == "none") {
                if (c.classList.contains("inline_display")) {c.style.setProperty("display", "inline");}
                else {c.style.setProperty("display", "block");}
            }
            else {c.style.setProperty("display", "none");}
        }
    }
}