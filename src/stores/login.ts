import { defineStore } from 'pinia';

export const useLoginForm = defineStore('login', {
  state: () => ({
    username: 'admin',
    password: '12345',
  }),
  actions: {
    login(username: string, password: string) {
      if (username === 'admin' && password === '12345') {
        this.username = username;
        this.password = password;
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    }
  }
});