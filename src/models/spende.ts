import { getPool } from "../db/db.js";
import type { Spende } from "../types.js";

export class SpendenModel {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM gehege");

    return result.rows;
  }

  static async findByID(id: string) {
    const value = [id];
    const result = await getPool().query(
      "SELECT * FROM spende WHERE id = $1",
      value
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async createNewSpende(spende: Spende) {
    const { spender_name, datum, betrag, beleg_url } = spende;
    const values = [spender_name, datum, betrag, beleg_url];
    const result = await getPool().query(
      `INSERT INTO spende(spender_name, datum, betrag, beleg_url) VALUES($1, $2, $3, $4) RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateSpende(id: string, spende: Spende) {
    const { spender_name, datum, betrag, beleg_url } = spende;
    const values = [spender_name, datum, betrag, beleg_url];
    const result = await getPool().query(
      `UPDATE spende SET spender_name = $1, datum = $2. betrag = $3, beleg_url = $4 WHERE id = $5`,
      values
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
  static async deleteSpende(id: string) {
    const value = [id];
    const result = await getPool().query(
      `DELETE * FROM spende WHERE id = $1`,
      value
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
}
