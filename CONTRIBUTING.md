# Contributing to Next.js Login Tile Application

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ccw-cfl/exp3.git
   cd exp3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Test-Driven Development (TDD)

This project follows TDD practices. Always write tests before implementing features:

1. **Write a failing test**
   ```bash
   npm run test:watch
   ```

2. **Implement the feature**
   - Write minimal code to make the test pass
   - Follow TypeScript best practices
   - Use existing components and utilities

3. **Refactor**
   - Improve code quality
   - Ensure tests still pass
   - Run linting and type checks

### Code Quality Standards

#### TypeScript
- Use strict TypeScript types
- Avoid `any` type unless absolutely necessary
- Define interfaces for all props and data structures
- Use type inference where appropriate

#### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript

#### Testing
- Write unit tests for all components
- Write integration tests for user flows
- Maintain minimum 70% code coverage
- Test accessibility with jest-axe (when implemented)

#### Code Style
- Run `npm run format` before committing
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write tests
   - Implement features
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Commit message format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `test:` - Test changes
   - `refactor:` - Code refactoring
   - `style:` - Code style changes
   - `chore:` - Maintenance tasks

4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Describe your changes
   - Link related issues
   - Ensure CI checks pass

## Project Structure Guidelines

### Component Organization
```
components/
├── ui/              # Reusable UI components (shadcn/ui)
├── auth/            # Authentication-related components
├── dashboard/       # Dashboard-specific components
└── shared/          # Shared utility components
```

### File Naming
- Components: PascalCase (e.g., `LoginForm.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Tests: Match component name with `.test.tsx` suffix
- Types: PascalCase with `types.ts` suffix

### Import Order
1. React and Next.js imports
2. Third-party libraries
3. Local components
4. Local utilities
5. Types
6. Styles

## Testing Guidelines

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })
})
```

### Integration Tests
- Test complete user flows
- Test component interactions
- Test state management

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Accessibility Guidelines

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain proper color contrast
- Support focus indicators

## Performance Guidelines

- Use Next.js Image component for images
- Implement proper loading states
- Use React.lazy for code splitting
- Optimize bundle size
- Minimize re-renders with React.memo
- Use proper caching strategies

## Documentation

- Update README.md for feature changes
- Add JSDoc comments for complex functions
- Document props with TypeScript types
- Update CHANGELOG.md (when created)

## Pull Request Process

1. **Ensure all checks pass**
   - Tests pass
   - Build succeeds
   - TypeScript compiles
   - ESLint passes
   - Coverage threshold met

2. **Update documentation**
   - Update README if needed
   - Add inline comments
   - Update API docs

3. **Request review**
   - Assign reviewers
   - Address feedback
   - Keep PR focused and small

## Code Review Guidelines

### For Reviewers
- Check code quality and style
- Verify tests are comprehensive
- Ensure documentation is updated
- Test functionality locally
- Provide constructive feedback

### For Contributors
- Respond to feedback promptly
- Ask questions if unclear
- Make requested changes
- Re-request review when ready

## Getting Help

- Open an issue for bugs or feature requests
- Ask questions in discussions
- Check existing issues before creating new ones
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this project better!
