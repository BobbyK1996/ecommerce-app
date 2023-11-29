import CRYPTO from "crypto";
import UTIL from "util";
import Repository from "./repository.js";

const scrypt = UTIL.promisify(CRYPTO.scrypt);

class UsersRepository extends Repository {
  async create(attributes) {
    attributes.id = this.randomId();

    const salt = CRYPTO.randomBytes(8).toString("hex");
    const hashedBuffer = await scrypt(attributes.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attributes,
      password: `${hashedBuffer.toString("hex")}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashedSaved, salt] = saved.split(".");
    const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

    return hashedSaved === hashedSuppliedBuffer.toString("hex");
  }
}

//Since we only ever need one copy of this...
export default new UsersRepository("users.json");
