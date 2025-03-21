// Navigation items with nested children for Components
export const navItems = [
    { id: "introduction", label: "Introduction", icon: "info" },
    { id: "installation", label: "Installation", icon: "download" },
    {
        id: "components",
        label: "Components",
        icon: "box",
        hasChildren: true,
        children: [
            { id: "accordion", label: "Accordion", icon: "chevrons-down" },
            { id: "alert", label: "Alert", icon: "alert-circle" },
            { id: "badge", label: "Badge", icon: "tag" },
            { id: "button", label: "Button", icon: "square" },
            { id: "card", label: "Card", icon: "credit-card" },
            { id: "carousel", label: "Carousel", icon: "image" },
            { id: "checkbox", label: "Checkbox", icon: "check-square" },
            { id: "input", label: "Input", icon: "type" },
            { id: "modal", label: "Modal", icon: "maximize" },
            { id: "toast", label: "Toast", icon: "message-square" },
        ],
    },
    { id: "usage", label: "Usage", icon: "code" },
    { id: "examples", label: "Examples", icon: "eye" },
]