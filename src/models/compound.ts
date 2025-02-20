import { get } from "http";
import { getPool } from "../db/db.js";
import type { Gehege } from "../types.js";

export class CompoundModel {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM gehege");

    return result.rows;
  }

  static async findByID(id: string) {
    const value = [id];
    const result = await getPool().query(
      "SELECT * FROM gehege WHERE id = $1",
      value
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async createCompound(gehege: Gehege) {
    const { groesse, instandhaltungskosten, name } = gehege;
    const values = [groesse, instandhaltungskosten, name];
    const result = await getPool().query(
      `INSERT INTO gehege(groesse, instandhaltungskosten, name) VALUES($1, $2, $3) RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateCompound(id: string, gehege: Gehege) {
    const { groesse, instandhaltungskosten, name } = gehege;
    const values = [groesse, instandhaltungskosten, name, id];
    const result = await getPool().query(
      `UPDATE gehege SET groesse = $1, instandhaltungskosten = $2, name = $3 WHERE ID = $4 RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async deleteCompoundByID(id: string) {
    const value = [id];
    const result = await getPool().query(
      "DELETE * FROM gehege WHERE id = $1",
      value
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
}
