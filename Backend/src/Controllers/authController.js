const prisma = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const hashed = await bcrypt.hash(password, 10); // 10 rounds of hash
    const user = await prisma.user.create({
      data: { username, password: hashed, role: role === 'ADMIN' ? 'ADMIN' : 'USER' }
    });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ message: 'username already exists' });
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
