import type { AuthService } from "@/services/auth.service";
import type { InjectionKey } from "vue";

export const authServiceInjectionKey = Symbol() as InjectionKey<AuthService>