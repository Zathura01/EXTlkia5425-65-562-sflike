chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        try {
            const url = new URL(tab.url);
            let domain = url.hostname;

            // Remove "www." prefix
            if (domain.startsWith("www.")) {
                domain = domain.slice(4);
            }

            console.log("Checking domain:", domain);

            // 🔁 Send to your server
            fetch("http://localhost:3000/check-domain/searchDB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ domain })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.found) {
                        chrome.action.setBadgeText({ tabId, text: "✔️" });
                        chrome.action.setBadgeBackgroundColor({ tabId, color: "#fd0000ff" });
                        chrome.action.setTitle({ tabId, title: `Domain matched: ${domain}` });
                    } else {
                        chrome.action.setBadgeText({ tabId, text: "✘" });
                        chrome.action.setBadgeBackgroundColor({ tabId, color: "#50ef11ff" });
                        chrome.action.setTitle({ tabId, title: `No match found for ${domain}` });
                    }

                })
                .catch(err => {
                    console.error("🔥 Error calling server:", err);
                    chrome.action.setBadgeText({ tabId, text: " ERROR " });
                    chrome.action.setBadgeBackgroundColor({ tabId, color: "#181717ff" });  
                });

        } catch (e) {
            console.error("Invalid URL in tab:", tab.url);
        }
    }
});
