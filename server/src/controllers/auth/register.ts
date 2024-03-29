import { Response, Request } from 'express'
const pool = require('../../lib/db')
const bcrypt = require('bcrypt')
import { QueryResult } from 'pg'
const saltRounds = 10

export const createUser = (req: Request, res: Response) => {
  const { fullName, email, password, role, phoneNumber }: any = req.body

  if (
    fullName === undefined ||
    email === undefined ||
    password === undefined ||
    phoneNumber === undefined
  ) {
    return res.status(400).json({ message: 'Fill all the input fields' })
  }

  const checkQuery = 'SELECT * FROM users where email = $1'

  pool.query(checkQuery, [email], (err: Error, result: QueryResult) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    if (result.rows.length > 0) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' })
    }
    if (!validateEmail(email)) {
      return res.status(409).json({ message: 'Invalid email' })
    }
    if (role === undefined) {
      return res.status(409).json({ message: 'Please provide a role' })
    }
    bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
      if (err) return err
      const insertQuery =
        'INSERT INTO users ( email, password, role, fullname, phone_number) VALUES ($1, $2, $3, $4, $5)'
      pool.query(
        insertQuery,
        [email, hash, role, fullName, phoneNumber],
        (err: Error) => {
          if (err) return res.status(400).send(err)
          const query = 'select * from users where email = $1'
          pool.query(query, [email], (err: Error) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({
              message: 'User  successfully created'
            })
          })
        }
      )
    })
  })
}

function validateEmail(email: string) {
  const containsUppercase = /[A-Z]/.test(email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/

  if (containsUppercase) {
    return false
  }

  return emailRegex.test(email)
}
