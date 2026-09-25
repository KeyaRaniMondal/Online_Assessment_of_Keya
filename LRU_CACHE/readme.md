# Data structure

This implementation uses JavaScript's Map. Map provides average O(1) lookup, insertion, and deletion and preserves insertion order.

# LRU working Order:
- First Map entry -> Least Recently Used
- Last Map entry  -> Most Recently Used

# On get():
```
map.delete(key);
map.set(key, value);
```
- This moves the accessed item to the end.

# On put():
```
map.keys().next().value
```
# Complexity
get() -> O(1) average
put() -> O(1) average
Space -> O(capacity)

# Also Implementedd Using TTL/Expiration Support
TTL is implemented using an expiration timestamp (expiresAt) for each entry. Expiration is checked lazily during get() and put() operations. Before insertion, expired entries are removed to keep the cache capacity accurate. This cleanup requires O(capacity) time in the worst case, while get() remains O(1) on average.

# To run:
node lru_cache_using_TTL.js