import { defineStore } from "pinia"
import { useSessionStorage } from "@vueuse/core"
import { useCookies } from "@vueuse/integrations/useCookies"
import { http } from "@/utils/http"
import { ref } from "vue"

export interface IUserIdentity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  nickname: string;
  data: any;
  permissions: any[];
  sessions: null;
  user: number;
  client: number;
}

export interface IUserAccount {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  avatar: string;
  username: string;
  firstname: string;
  lastname: string;
  description: string;
  permission: number;
  verifyDescription: string;
  verifiedAt: any;
  lockedAt: any;
  detail: {
    email: string;
    emailVerifiedAt: any;
    secondaryEmail: string;
    secondaryEmailVerifiedAt: any;
    phoneNumber: string;
    phoneNumberVerifiedAt: any;
  };
}

const serializer = {
  read(v: string) {
    try {
      return JSON.parse(v)
    } catch {
      return null
    }
  },
  write(v: any) {
    if (v != null) {
      return JSON.stringify(v)
    } else {
      return "null"
    }
  }
}

export const useAccountData = defineStore("account", () => {
  const cookies = useCookies(["authorization"])
  const identity = useSessionStorage<IUserIdentity | null>("user-data", null, { deep: true, serializer })
  const account = useSessionStorage<IUserAccount | null>("user-data", null, { deep: true, serializer })
  const isLoggedIn = ref(account ? true : false)

  async function fetch() {
    if (cookies.get("authorization") != null) {
      const res = await http.get("/api/users")
      isLoggedIn.value = true
      identity.value = res.data.identity
      account.value = res.data.account
    } else {
      isLoggedIn.value = false
    }
  }

  function logout() {
    account.value = null
    identity.value = null
    cookies.remove("authorization")
  }

  return { account, identity, isLoggedIn, fetch, logout }
})
