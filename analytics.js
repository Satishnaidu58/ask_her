// Function to get user details
function getUserDetails() {
    const userDetails = {
        timestamp: new Date().toISOString(),  // Current timestamp
        userAgent: navigator.userAgent,       // Browser and OS details
        language: navigator.language,         // Browser language
        screenResolution: `${window.innerWidth}x${window.innerHeight}`, // Screen resolution
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,   // Timezone
        deviceType: getDeviceType(),           // Device type (desktop, mobile, tablet)
    };

    return userDetails;
}

// Function to detect device type
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mobile')) {
        return 'mobile';
    } else if (userAgent.includes('tablet')) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

// Function to store user data in localStorage
function storeUserData(pageName, nextPagUrl) {
    const userDetails = getUserDetails(pageName);
    // Store the details in localStorage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    pageAnalytics(pageName);
    console.log("User data stored:", userDetails);
    if (storeUserData) {
        moveToNextPage(nextPagUrl);
    };
}

function moveToNextPage(nextPagUrl) {
    window.location.href = nextPagUrl;
}

function pageAnalytics(pageName) {
    // Get the current data from localStorage (if any)
    let pageDetails = JSON.parse(localStorage.getItem("pageDetails")) || {};

    // Check if the page has already been visited, if so increment the counter
    if (pageDetails[pageName]) {
        pageDetails[pageName] += 1;
    } else {
        // If not, set the visit count to 1
        pageDetails[pageName] = 1;
    }
    // Store the updated page visit details in localStorage
    localStorage.setItem("pageDetails", JSON.stringify(pageDetails));
}

