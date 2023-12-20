
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

// Define routes
const routes = window.routes;

// Function to get FontAwesome icon class based on route
function getFontAwesomeIconClass(route) {
    switch (route) {
        case "onboarding1":
            return "fa-globe";
        case "homepage":
            return "fa-house";
        case "surveys":
            return "fa-poll";
        case "results":
            return "fa-chart-bar";
        case "news":
            return "fa-newspaper";
        case "support":
            return "fa-life-ring";
        default:
            return "fa-question";
    }
}

// Function to generate the sidebar
function generateSidebar() {
    sidebar.innerHTML = "";
    const currentPage = window.location.pathname.split("/").pop().split(".")[0] || 'index'; // Get the current page

    for (const route in routes) {
        if (shouldShowSidebar(currentPage, route)) {
            const linkContainer = document.createElement("div");
            linkContainer.classList.add("sidebar-link-container");

            const link = document.createElement("a");
            link.href = `${route}`;
            link.textContent = routes[route];
            linkContainer.appendChild(link);

            const topIndicator = document.createElement("div");
            topIndicator.classList.add("top-indicator");

            // Add different FontAwesome icons based on the route
            const iconClass = getFontAwesomeIconClass(route);
            const icon = document.createElement("i");
            icon.classList.add("fas", iconClass);
            topIndicator.appendChild(icon);

            linkContainer.appendChild(topIndicator);
            sidebar.appendChild(linkContainer);
        }
    }

    const logoutLinkContainer = document.createElement("div");
    logoutLinkContainer.classList.add("sidebar-link-container", "logout-container");

    const logoutLink = document.createElement("a");
    logoutLink.href = "login.html";
    logoutLink.textContent = "Logout";
    logoutLink.classList.add("logout-link");
    logoutLink.addEventListener("click", logout);
    logoutLinkContainer.appendChild(logoutLink);

    sidebar.appendChild(logoutLinkContainer);
}


    // Function to determine whether to show the sidebar on the current page
    function shouldShowSidebar(currentPage, route) {
    const excludedPages = ["onboarding1.html", "onboarding2.html", "login.html", "individual-survey.html"];
    return !excludedPages.includes(currentPage) && route !== "onboarding1.html" && route !== "onboarding2.html" && route !== "login.html" && route !== "individual-survey.html";
    }

    // Function to handle page navigation
    function navigateTo(route) {
    console.log(`Navigating to ${route}.html`);
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page without extension

    // Special handling for the root address
    if (currentPage === 'index.html') {
        sidebar.setAttribute("data-hide-sidebar", "true");
    } else {
        sidebar.setAttribute("data-hide-sidebar", shouldShowSidebar(currentPage, route), "false");
    }

    fetch(`/pages/${route}.html`) // Remove .html extension
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch page: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            console.log(`Fetched HTML for ${currentPage}`);
            content.innerHTML = html;
            document.title = `Healthcare Dashboard - ${routes[route]}`;
            // Use the History API to update the URL without a full page reload
            history.pushState({ route }, null, `${route}.html`);
            // Regenerate the sidebar for non-special cases
            generateSidebar();
        })
        .catch((error) => {
            console.error(error);
        });
}


    // Function to handle logout
    function logout() {
        // Implement logout logic
        // For example, redirect to the login page
        navigateTo("login");
    }

    // Initial setup
    window.navigateTo = navigateTo; // Make navigateTo globally accessible
    generateSidebar();
    navigateTo("onboarding1");
});
