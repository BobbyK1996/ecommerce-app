import FS from "fs";

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
}

new UsersRepository("users.json");
