import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { hashPassword } from '../utils/hashpassword.js'

dotenv.config()

export async function registerUser(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body
    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
    })
    await user.save();
    res.status(201).send({ message: 'Usuario registrado exitosamente' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Credenciales incorrectas' })
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    })
    res.cookie('token', token, { httpOnly: true }).send({ message: 'Login exitoso' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
