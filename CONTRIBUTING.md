# Contributing to Elevenstoic

Thank you for your interest in contributing to Elevenstoic! This document provides guidelines for internal team members.

## Development Workflow

### 1. Branch Naming

Use descriptive branch names following this pattern:

```
feature/short-description
fix/bug-description
refactor/component-name
docs/what-you-updated
```

Examples:
- `feature/add-streak-tracking`
- `fix/notification-timing`
- `refactor/quote-service`
- `docs/update-setup-guide`

### 2. Commit Messages

Write clear, descriptive commit messages:

```
<type>: <short description>

<optional longer description>

<optional footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Formatting, styling
- `docs`: Documentation
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat: add streak tracking to user profile

Implements daily login streak tracking and displays
streak count on home screen.

Closes #123
```

```
fix: notification timing incorrect on Android

Adjusts notification scheduling to account for
timezone differences on Android devices.
```

### 3. Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update types if needed

3. **Test thoroughly**
   ```bash
   # Type check
   npm run type-check

   # Run tests
   npm test

   # Test on both iOS and Android
   npm run ios
   npm run android
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch to `main`
   - Fill out the PR template
   - Request review from team lead

### 4. Pull Request Template

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
- [ ] Unit tests added/updated
- [ ] Type check passes

## Screenshots
If applicable, add screenshots

## Related Issues
Closes #(issue number)
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type
- Use meaningful variable names

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Bad
interface User {
  id: any;
  n: string;
  e: string;
}
```

### React Native

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component names

```typescript
// Good
export function QuoteCard({ quote }: { quote: Quote }) {
  const { user } = useUserStore();
  const isLiked = user?.likedQuotes.includes(quote.id);

  return (
    <View>
      <Text>{quote.text}</Text>
    </View>
  );
}

// Bad
export function QC({ q }: any) {
  return <View><Text>{q.t}</Text></View>;
}
```

### Styling

- Use StyleSheet.create()
- Define styles at component bottom
- Use theme colors from constants
- Follow spacing system

```typescript
const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: ELEVENSTOIC_BLUE,
  },
  text: {
    fontSize: FONT_SIZES.base,
    color: '#fff',
  },
});
```

## File Organization

### Where to Put New Files

- **Components**: `src/components/`
- **Screens**: `src/screens/`
- **Services**: `src/services/`
- **Hooks**: `src/hooks/`
- **Types**: `src/types/`
- **Utils**: `src/utils/`
- **Constants**: `src/constants/`

### Naming Conventions

- Components: PascalCase (`QuoteCard.tsx`)
- Hooks: camelCase with 'use' prefix (`usePersonalizedQuotes.ts`)
- Services: camelCase with 'Service' suffix (`notificationService.ts`)
- Types: PascalCase (`UserProfile`, `Quote`)
- Constants: UPPER_SNAKE_CASE (`ELEVENSTOIC_BLUE`)

## Testing Guidelines

### Unit Tests

Write tests for:
- Services (business logic)
- Utility functions
- Store actions
- Personalization algorithms

```typescript
// Example test
describe('PersonalizationService', () => {
  it('should filter quotes by focus area', () => {
    const quotes = PersonalizationService.getPersonalizedQuotes(
      responses,
      ['Peace'],
      []
    );

    expect(quotes.every(q => q.category === 'Peace')).toBe(true);
  });
});
```

### Manual Testing

Test on:
- iOS Simulator
- Android Emulator
- Physical iOS device
- Physical Android device

Test flows:
- Complete onboarding
- Like/save quotes
- Download wallpapers
- Change themes
- Receive notifications

## Documentation

### Code Comments

Add comments for:
- Complex logic
- Non-obvious decisions
- Algorithm explanations
- Important considerations

```typescript
/**
 * Calculate quote relevance score based on user preferences
 *
 * Algorithm:
 * - Previous likes: +10 points
 * - Keyword match: +5 points per match
 * - Emotional weight: +0.5 per weight point
 * - Random factor: +0-2 points for variety
 */
private static calculateQuoteScore(quote: Quote): number {
  // Implementation
}
```

### README Updates

Update documentation when:
- Adding new features
- Changing setup process
- Modifying architecture
- Adding dependencies

## Review Process

### As a Reviewer

- Check code quality and style
- Test the changes locally
- Verify type safety
- Consider edge cases
- Suggest improvements kindly
- Approve when satisfied

### As a Contributor

- Be open to feedback
- Respond to review comments
- Make requested changes
- Ask questions if unclear
- Thank reviewers

## Common Issues

### TypeScript Errors

```bash
# Check types
npm run type-check

# Fix common issues
- Add proper type annotations
- Import types correctly
- Define interfaces for props
```

### Linting Errors

```bash
# Run linter
npm run lint

# Auto-fix
npm run lint -- --fix
```

### Merge Conflicts

```bash
# Update your branch
git checkout main
git pull origin main
git checkout your-branch
git merge main

# Resolve conflicts
# Then commit
git commit -m "merge: resolve conflicts with main"
```

## Release Process

1. **Version Bump**
   ```json
   // package.json
   "version": "1.1.0"

   // app.json
   "version": "1.1.0"
   ```

2. **Update Changelog**
   - Add version number
   - List new features
   - List bug fixes
   - List breaking changes

3. **Build & Test**
   ```bash
   npm run type-check
   npm test
   npm run build:ios
   npm run build:android
   ```

4. **Tag Release**
   ```bash
   git tag -a v1.1.0 -m "Release version 1.1.0"
   git push origin v1.1.0
   ```

## Questions?

If you have questions:
1. Check existing documentation
2. Search previous issues/PRs
3. Ask in team chat
4. Create a GitHub discussion

## Code of Conduct

- Be respectful and professional
- Help others learn and grow
- Give constructive feedback
- Celebrate wins together
- Remember: We're building something meaningful

---

**Together, we're helping people live their one life fully. Make it count.**
