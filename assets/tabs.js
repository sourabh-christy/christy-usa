document.querySelectorAll("#tabs").forEach((tabsParent) => {
  const tabLinks = tabsParent.querySelectorAll(".tab-link");
  const tabContents = tabsParent.querySelectorAll(".tab-content");
  const isSoft = tabsParent.classList.contains("tabs-soft-js");
  const classToHide = isSoft ? "tab-content-hidden-soft" : "hidden";

  // Add click event listener to each tab link
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
      const tabName = tabLink.dataset.tab;

      // Show the relevant tab content and hide others
      tabContents.forEach((tabContent) => {
        tabContent.classList.toggle(classToHide, tabContent.id !== tabName);
      });

      // Update active class for tab links
      tabLinks.forEach((link) => {
        link.classList.toggle("active", link === tabLink);
        window.dispatchEvent(new Event('product-splider-refresh'));
      });
    });
  });
});

