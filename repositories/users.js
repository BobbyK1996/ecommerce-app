import FS from "fs";
import CRYPTO from "crypto";

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      FS.accessSync(this.filename);
    } catch (err) {
      FS.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await FS.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
  }

  async create(attributes) {
    attributes.id = this.randomId();
    const records = await this.getAll();
    records.push(attributes);

    await this.writeAll(records);
  }

  async writeAll(records) {
    await FS.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return CRYPTO.randomBytes(4).toString("hex");
  }
}

const repo = new UsersRepository("users.json");

await repo.create({ email: "test@email.com", password: "1234" });

const users = await repo.getAll();
console.log(users);
