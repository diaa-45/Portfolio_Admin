import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly tokenKey = 'pa.auth.accessToken';
  private inMemoryToken: string | null = null;

  // Prefer sessionStorage to limit persistence window; fall back to localStorage if needed
  private get storage(): Storage {
    return sessionStorage;
  }

  setToken(token: string | null): void {
    this.inMemoryToken = token;
    if (token) {
      this.storage.setItem(this.tokenKey, token);
    } else {
      this.storage.removeItem(this.tokenKey);
    }
  }

  getToken(): string | null {
    // Always source of truth from storage so manual clears are respected
    const persisted = this.storage.getItem(this.tokenKey);
    this.inMemoryToken = persisted;
    return persisted;
  }

  clearToken(): void {
    this.inMemoryToken = null;
    this.storage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeJwt(token);
    if (!decoded || !decoded.exp) return false; // If no exp, treat as non-expiring
    const nowSeconds = Math.floor(Date.now() / 1000);
    return decoded.exp <= nowSeconds;
  }

  decodeJwt(token: string): any | null {
    try {
      const [, payload] = token.split('.');
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch {
      return null;
    }
  }
}
