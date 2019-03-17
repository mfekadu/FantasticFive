import { Connection, createQueryBuilder, getConnection } from "typeorm";
import { Session, User, Product, ProductBrand, ProductCategory } from "../../entity";

export default class DatabaseUtils {
  public static clearDB(): Promise<any> {
    const connection: Connection = getConnection();
    if (connection && connection.isConnected) {
      return Promise.all([Session, User, Product, ProductBrand, ProductCategory].map((entity) => {
        return createQueryBuilder().delete().from(entity).execute();
      }));
    }
    return Promise.resolve();
  }
}
