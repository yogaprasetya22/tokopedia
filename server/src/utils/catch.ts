import { createCache } from "cache-manager";
import { Keyv } from "keyv";
import { KeyvCacheableMemory } from "cacheable";

const store = new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 });
const keyv = new Keyv({ store });
export const cache = createCache({ stores: [keyv] });
