function updateMenu() {
  if (selection != undefined) {
    planetOptions.style.display = "grid";

    document.getElementById("poInner1").innerHTML = "Name: " + selection.name;
    document.getElementById("poInner2").innerHTML = "Size (radius): " + selection.size;
    document.getElementById("poInner3").innerHTML = "X:" + parseInt(selection.x);
    document.getElementById("poInner4").innerHTML = "Y:" + parseInt(selection.y);

  } else {
    planetOptions.style.display = "none";
  }
}

function initInputVals() {
  document.getElementById("nameInput").value = selection.name;
  document.getElementById("sizeInput").value = selection.size;
}
