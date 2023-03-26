import type { StorageReference } from 'firebase/storage';
import { writable } from 'svelte/store';

export const currentRefStore = writable<StorageReference | null>(null);
