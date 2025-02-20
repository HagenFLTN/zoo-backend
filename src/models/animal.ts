import { getPool } from "../db/db.js";
import type { Tier } from "../types.js";

export class AnimalModel {
  static async findAll() {
    const result = await getPool().query(`SELECT * FROM tier`);
    if (result.rows.length > 0) {
      return result.rows;
    }
  }

  static async findByID(id: number) {
    const result = await getPool().query(
      `SELECT * FROM tier WHERE id = $1`,
      [id]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async createAnimal(data: {
    name: string;
    gehege_id: number;
    tierarzt_id: number;
  }) {
    const { name, gehege_id, tierarzt_id } = data;
    const values = [name, gehege_id, tierarzt_id];

    const result = await getPool().query(
      `INSERT INTO tier (name, gehege_id, tierarzt_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
      values
    );

    return result.rows[0];
  }
}
