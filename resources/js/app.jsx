import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

// Disable pinch-to-zoom and double-tap zoom
document.addEventListener(
    "touchmove",
    function (event) {
        if (event.scale !== undefined && event.scale !== 1) {
            event.preventDefault();
        }
    },
    { passive: false }
);

document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
});
