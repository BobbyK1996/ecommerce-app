import FS, { fstat, utimes } from "fs";

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
    const records = await this.getAll();
    records.push(attributes);

    //Write the updated records array to this.filename
    await this.writeAll(records);
  }

  async writeAll(records) {
    await FS.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
}

const repo = new UsersRepository("users.json");

await repo.create({ email: "test@email.com", password: "1234" });

const users = await repo.getAll();
console.log(users);
