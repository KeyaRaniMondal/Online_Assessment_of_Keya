class Cache {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be positive");
        }
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.capacity) {
            const lruKey = this.map.keys().next().value;
            this.map.delete(lruKey);
        }
        this.map.set(key, value);
    }
}

const cache = new Cache(2);
cache.put("A", 10);
cache.put("B", 20);
console.log(cache.get("A"));
cache.put("C", 30);
console.log(cache.get("B"));
console.log(cache.get("C"));
console.log(cache.get("A")); 