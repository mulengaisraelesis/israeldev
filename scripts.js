const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];
const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });
});

const revealNodes = document.querySelectorAll(
  ".reveal, .reveal-delay, .reveal-delay-2",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in-view"));
}
