import type { AuthService } from "@/services/auth.service";
import type { InjectionKey, Ref } from "vue";

export const authServiceInjectionKey = Symbol() as InjectionKey<AuthService>