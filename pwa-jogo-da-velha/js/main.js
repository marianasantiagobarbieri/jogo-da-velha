window.onload = () => {
    "use string";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
}
