
class Cache {
    constructor(capacity, defaultTTL = null) {
        if (capacity <= 0) {
            throw new Error("Capacity must be positive");
        }

        this.capacity = capacity;
        this.defaultTTL = defaultTTL;
        this.map = new Map();
    }

    _isExpired(entry) {
        return (
            entry.expiresAt !== null &&
            Date.now() >= entry.expiresAt
        );
    }

    _removeExpiredEntries() {
        for (const [key, entry] of this.map) {
            if (this._isExpired(entry)) {
                this.map.delete(key);
            }
        }
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }

        const entry = this.map.get(key);

        if (this._isExpired(entry)) {
            this.map.delete(key);
            return -1;
        }

        this.map.delete(key);
        this.map.set(key, entry);

        return entry.value;
    }

    put(key, value, ttl = this.defaultTTL) {
        if (ttl !== null && ttl <= 0) {
            throw new Error("TTL must be positive or null");
        }

        this._removeExpiredEntries();

        if (this.map.has(key)) {
            this.map.delete(key);
        }

        if (this.map.size >= this.capacity) {
            const lruKey = this.map.keys().next().value;
            this.map.delete(lruKey);
        }

        const expiresAt =
            ttl === null ? null : Date.now() + ttl;

        this.map.set(key, {
            value,
            expiresAt,
        });
    }
}


const cache = new Cache(2);

cache.put("A", 100, 3000);
cache.put("B", 200);

console.log(cache.get("A"));

setTimeout(() => {
    console.log(cache.get("A"));
    console.log(cache.get("B"));
}, 4000);