import { Db, Document, MongoClient } from 'mongodb';

class MongoDBHelper {
  private static client?: MongoClient;
  private static uri?: string;
  static db?: Db;

  static async connect(uri: string) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
    this.client.on('connectionClosed', () => {
      this.client = undefined;
    });
    this.db = this.client.db();
  }

  static async disconnect() {
    if (this.client) await this.client.close();
    this.client = undefined;
    this.db = undefined;
  }

  static async getCollection<TSchema extends Document = Document>(
    name: string,
  ) {
    if (!this.uri) return;
    if (!this.client) {
      await this.connect(this.uri);
    }
    return this.db!.collection<TSchema>(name);
  }
}

export default MongoDBHelper;
