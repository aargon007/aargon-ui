# Contributing to Aargon UI 🤝

We welcome contributions! Here's how you can help make Aargon UI better for everyone.

## Ways to Contribute

- 🐛 **Report bugs** - Found a bug? Open an issue
- 💡 **Suggest features** - Have an idea? We'd love to hear it
- 📝 **Improve documentation** - Help others understand the components
- 🔧 **Fix issues** - Pick up an issue and submit a PR
- 🎨 **Create components** - Add new animated components
- 🧪 **Write tests** - Help improve code quality

## Getting Started

### 1. Fork the Repository

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/aargon007/aargon-ui.git
cd aargon-ui
```

### 2. Set Up Development Environment

```bash
# Install dependencies
yarn install

# Start development (recommended - uses source files)
yarn dev:source

# Or start with package builds
yarn dev:all
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-fix
```

## 🛠️ Development

This is a Turbo monorepo with individual packages. Each package can be developed and published independently.

### Prerequisites

- Node.js 18+
- Yarn 1.22.22+
- React Native 0.81.4
- Expo ~54.0.10
- React Native Reanimated 4.1.0+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/aargon007/aargon-ui.git
cd aargon-ui

# Install dependencies
yarn install

# Build all packages
yarn build

# Run example app (source mode - no build needed)
yarn dev:source

# Run example app (with package builds)
yarn dev:all

# Develop a specific package
yarn dev --filter=aargon-button
```

### Development Modes

#### Source Development (Recommended)

```bash
yarn dev:source
```

- Uses TypeScript source files directly
- Instant hot reload
- No compilation step needed
- Fastest development experience

#### Build Development

```bash
yarn dev:all
```

- Compiles packages to JavaScript
- Tests production-like behavior
- Slower but more accurate

### Package Structure

Each package follows this structure:

```
packages/aargon-[component]/
├── src/
│   ├── Animated[Component].tsx    # Main component
│   ├── index.ts                   # Exports
│   └── utils.ts                   # Utilities and types
├── lib/                          # Compiled output
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript config
├── README.md                     # Package documentation
├── CHANGELOG.md                  # Version history
└── LICENSE                       # MIT License
```

### Available Scripts

```bash
# Development
yarn dev:source          # Run example with source files
yarn dev:all            # Run example with built packages
yarn dev:packages       # Build packages in watch mode
yarn dev:example        # Run example only

# Building
yarn build              # Build all packages
yarn build:watch        # Build packages in watch mode

# Publishing
yarn publish:packages   # Publish all packages
yarn release           # Build and publish

# Utilities
yarn lint              # Lint all packages
yarn type-check        # Type check all packages
yarn clean             # Clean all build outputs
```

## Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow **React Native** best practices
- Use **functional components** with hooks
- Follow **conventional commits** for commit messages

### Component Guidelines

- **Accessibility first** - Include ARIA attributes and keyboard support
- **Customizable** - Provide theming and styling options
- **Performant** - Use Reanimated for smooth 60fps animations
- **TypeScript** - Full type safety with comprehensive interfaces
- **Documented** - Include JSDoc comments and examples

### File Structure

Each package follows this structure:

```
packages/aargon-[component]/
├── src/
│   ├── Animated[Component].tsx    # Main component (PascalCase)
│   ├── index.ts                   # Exports
│   └── utils.ts                   # Types, utilities, themes
├── lib/                          # Compiled output
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript config
├── README.md                     # Package documentation
├── CHANGELOG.md                  # Version history
└── LICENSE                       # MIT License
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat(accordion): add new animation type"

# Bug fixes
git commit -m "fix(button): resolve touch event issue"

# Documentation
git commit -m "docs(readme): update installation guide"

# Breaking changes
git commit -m "feat(modal): change API for better UX

BREAKING CHANGE: onClose prop is now required"
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Update CHANGELOG.md** with your changes
4. **Ensure all checks pass** (linting, type checking, builds)
5. **Test on multiple platforms** (iOS, Android, Web)

### PR Template

When creating a PR, please include:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web
- [ ] Added unit tests

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] No breaking changes (or breaking changes documented)
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on multiple platforms
4. **Documentation** review
5. **Approval** and merge

## Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- **React Native version**
- **Package version**
- **Platform** (iOS/Android/Web)
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Code sample** that reproduces the issue

### Feature Requests

For new features, please include:

- **Use case** - Why is this needed?
- **Proposed API** - How should it work?
- **Alternatives** - What else have you considered?
- **Additional context** - Any other relevant information

## Development Workflow

### Working on a Component

1. **Choose a component** from the packages list
2. **Check existing issues** for related work
3. **Create a branch** for your changes
4. **Make your changes** following the guidelines
5. **Test thoroughly** on all platforms
6. **Update documentation** as needed
7. **Submit a PR** with a clear description

### Adding a New Component

1. **Create the package structure** following the template
2. **Implement the component** with full TypeScript support
3. **Add comprehensive documentation** (README, API docs)
4. **Include examples** in the example app
5. **Add to the main README** packages list
6. **Update CHANGELOG** with new component
7. **Update unified package** (`packages/aargon-ui`) to include the new component
8. **Test both individual and unified package** installations

### Testing Guidelines

- **Unit tests** for component logic
- **Integration tests** for component interactions
- **Visual tests** for animations and styling
- **Accessibility tests** for screen readers and keyboard navigation
- **Cross-platform testing** on iOS, Android, and Web

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or political discussions
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes
- **BETA** versions for pre-release testing (e.g., `1.0.0-beta.1`)

### Publishing

#### Individual Packages

1. **Create changeset** with `yarn changeset`
2. **Version packages** with `yarn version-packages`
3. **Publish packages** with `yarn release`
4. **Update documentation** if needed
5. **Create release notes** on GitHub

#### Unified Package (Beta)

The unified `aargon-ui` package is published separately and includes all individual components:

1. **Build the unified package**:

    ```bash
    cd packages/aargon-ui
    npm run build
    ```

2. **Update version** in `packages/aargon-ui/package.json`:

    ```json
    {
        "version": "1.0.0-beta.X"
    }
    ```

3. **Publish beta version**:

    ```bash
    npm publish --tag beta
    ```

4. **Update documentation** to reflect new beta version

### Beta Release Guidelines

- **Beta versions** are for testing and feedback
- **Breaking changes** are allowed between beta versions
- **Documentation** should clearly indicate beta status
- **Feedback** should be collected and addressed before stable release

## Getting Help

### Documentation

- **Package READMEs** - Individual component documentation
- **API Reference** - Comprehensive prop and type documentation
- **Examples** - Live examples in the example app
- **Changelog** - Version history and breaking changes

### Community

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Discord** - Real-time chat and support (coming soon)

### Maintainers

- **@aargon007** - Project maintainer
- **@contributors** - Community contributors

## Recognition

### Contributors

All contributors are recognized in:

- **README.md** - Contributors section
- **CHANGELOG.md** - Individual contributions
- **GitHub** - Contributor graphs and profiles

### Hall of Fame

Special recognition for:

- **Major contributors** - Significant code contributions
- **Documentation heroes** - Documentation improvements
- **Bug hunters** - Critical bug reports and fixes
- **Community champions** - Helping other contributors

## License

By contributing to Aargon UI, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to Aargon UI! 🎉

Made with ❤️ by [Aargon](https://github.com/aargon007) and contributors
