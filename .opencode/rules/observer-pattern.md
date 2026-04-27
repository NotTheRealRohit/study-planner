# Observer Pattern — Function vs Object Observers

## Problem

When implementing custom observables or observers, tests may pass a function directly to `subscribe()`:

```typescript
observable.subscribe((value) => {
  emissions.push(value);
});
```

But the implementation expects an object with `.next()` method:

```typescript
subscribe(observer: Observer<T>) {
  observer.next(value);  // ❌ fails if observer is a function
}
```

## Solution

Support both patterns by detecting observer type:

```typescript
interface Observer<T> {
  next(value: T): void;
  error(err: Error): void;
  complete(): void;
}

interface SimpleObservable<T> {
  subscribe(observer: ((value: T) => void) | Observer<T>): Subscription;
}

// In implementation:
const nextFn = typeof observer === 'function' ? observer : observer.next;
const errorFn = typeof observer === 'function' ? console.error : observer.error;

const wrappedObserver: Observer<T> = {
  next: nextFn,
  error: errorFn,
  complete: () => {},
};
```

## Key Learnings

1. **Standard Observable contract**: JavaScript conventions vary — some libs use function callbacks, others use objects with methods
2. **TypeScript union types**: Use `((value: T) => void) | Observer<T>` to accept both
3. **Type guards**: `typeof observer === 'function'` reliably distinguishes the two patterns
4. **WatermelonDB's `observe()`**: Returns an observable that emits on every database change — useful for reactive UI updates

## When to Use This Pattern

- Custom observable implementations
- Wrapping database query observations
- Building reactive data layers
- Any place where you want to support flexible caller APIs