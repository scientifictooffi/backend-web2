document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("a");

  var visitedLinks = JSON.parse(localStorage.getItem("visitedLinks")) || [];

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      visitedLinks.push(link.href);

      visitedLinks = Array.from(new Set(visitedLinks));

      localStorage.setItem("visitedLinks", JSON.stringify(visitedLinks));

      updateVisitedLinks();
    });
  });

  function updateVisitedLinks() {
    var visitedLinksContainer = document.getElementById("visitedLinks");
    visitedLinksContainer.innerHTML = "";

    visitedLinks.forEach(function (visitedLink) {
      var listItem = document.createElement("li");
      listItem.textContent = visitedLink;
      visitedLinksContainer.appendChild(listItem);
    });
  }

  updateVisitedLinks();
});
