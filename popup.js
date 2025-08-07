chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = new URL(tabs[0].url);
  const domain = url.hostname;
  document.getElementById("domain").innerText = domain
});
