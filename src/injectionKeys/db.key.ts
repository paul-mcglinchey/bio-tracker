import type { InjectionKey } from "vue";
import type PocketBase from 'pocketbase'

export const dbInjectionKey = Symbol() as InjectionKey<PocketBase>