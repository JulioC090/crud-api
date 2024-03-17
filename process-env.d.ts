declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      MONGO_URL: string;
    }
  }
}

export {};
