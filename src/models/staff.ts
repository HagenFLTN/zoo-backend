import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class StaffModel {
  static async findAll() {
    const result = await getPool().query(
      `SELECT p.id, b.bezichnung FROM personal p JOIN beruf b ON p.beruf_id = b.id`
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async getFreeVet() {
    const freeVet = await getPool().query(
      `SELETC personal.id, COUNT(*) FROM personal JOIN beruf ON personal.beruf_id = beruf.id JOIN tier ON tier.tierazt_id = personal.id WHERE beruf.bezeichnung = 'Tierarzt' GROUP BY personal.id`
    );
    if (freeVet.rowCount === 0)
      throw new HTTPException(404, { message: "no animal found" });
    return freeVet.rows;
  }

  static async findVetByID(id: number) {
    const result = await getPool().query(
      `SELECT * FROM personal p JOIN beruf b ON p.beruf_id =  b.id WHERE p.id = $1 AND b.bezeichnung ILIKE 'tierarzt'`,
      [id]
    );
    return result.rows.length > 0;
  }

  static async findStaffByID(id: string) {
    const result = await getPool().query(
      `SELECT * FROM personal WHERE id = $1`
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
}
