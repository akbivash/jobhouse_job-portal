import { Request, Response } from 'express'
import { QueryResult } from 'pg'
const pool = require('../../../lib/db')

export const getJobLevels = async (req: Request, res: Response) => {
  try {
    const query = `select * from job_levels`
    const result: QueryResult = await pool.query(query)
    return res.status(200).send(result.rows)
  } catch (err) {
    return res.status(404).send({ message: err })
  }
}
