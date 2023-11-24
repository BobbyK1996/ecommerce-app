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
    //Open the file named after this.filename
    const contents = await FS.promises.readFile(this.filename, {
      encoding: "utf-8",
    });
    //Parse the content
    const data = JSON.parse(contents);
    //Return the parsed content
    return data;
  }
}

const repo = new UsersRepository("users.json");

const users = await repo.getAll();
console.log(users);
