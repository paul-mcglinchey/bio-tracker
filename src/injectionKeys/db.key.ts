import type { InjectionKey, Ref } from "vue";
import type PocketBase from 'pocketbase'

export const dbInjectionKey = Symbol() as InjectionKey<PocketBase>