// Navigation items with nested children for Components
export const navItems = [
    { id: 'introduction', label: 'Introduction', icon: 'info' },
    { id: 'installation', label: 'Installation', icon: 'download' },
    {
        id: 'components',
        label: 'Components',
        icon: 'box',
        hasChildren: true,
        children: [
            { id: 'accordion', label: 'Accordion', icon: 'chevrons-down' },
            { id: 'badge', label: 'Badge', icon: 'tag' },
            { id: 'button', label: 'Button', icon: 'square' },
            { id: 'checkbox', label: 'Checkbox', icon: 'check-square' },
            { id: 'dropdown', label: 'Dropdown', icon: 'chevron-down' },
            { id: 'input', label: 'Input', icon: 'type' },
            { id: 'modal', label: 'Modal', icon: 'maximize' },
            { id: 'progressbar', label: 'Progressbar', icon: 'arrow-down-circle' },
            { id: 'radio', label: 'Radio', icon: 'circle' },
            { id: 'select', label: 'Select', icon: 'list' },
            { id: 'skeleton', label: 'Skeleton', icon: 'loader' },
            { id: 'snackbar', label: 'Snackbar', icon: 'alert-circle' },
            { id: 'switch', label: 'Switch', icon: 'toggle-right' },
            { id: 'toast', label: 'Toast', icon: 'message-square' },
        ],
    },
    { id: 'usage', label: 'Usage', icon: 'code' }
];
