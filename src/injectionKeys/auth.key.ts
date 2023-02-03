import type { BaseAuthStore } from "pocketbase";
import type { InjectionKey, Ref } from "vue";

export const authInjectionKey = Symbol() as InjectionKey<Ref<BaseAuthStore | null>>