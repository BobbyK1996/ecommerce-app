import FS from "fs";
import CRYPTO from "crypto";

export default class Repository {
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

  async create(attributes) {
    attributes = this.randomId();

    const records = await this.getAll();
    records.push(attributes);
    await this.writeAll(records);

    return attributes;
  }

  async getAll() {
    return JSON.parse(
      await FS.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
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

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attributes) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id of ${id} not found`);
    }

    Object.assign(record, attributes);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }
}
