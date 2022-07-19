require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./helpers/errorMiddleware');
const app = require('./api');
const { User, Category } = require('./database/models');
const authLogin = require('./helpers/authLogin');
const authUserEmail = require('./helpers/authUser');
const authUserPassword = require('./helpers/authUserPassword');
const authToken = require('./helpers/authToken');
const categoryName = require('./helpers/categoryName');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;
const secret = process.env.JWT_SECRET;
// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post('/login', authLogin, async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const user = await User.findOne({ where: { email, password } });
  // console.log(user);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  if (user) {
    console.log(secret);
    const token = jwt.sign({ data: user.id }, secret, jwtConfig);
  return res.status(200).json({ token });
  }
   return res.status(400).json({ message: 'Invalid fields' });
});

app.post('/user', 
authLogin, 
authUserEmail,
// authToken, 
authUserPassword, async (req, res) => {
  const { email, password, displayName, image } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
   await User.create({ displayName, email, password, image });
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(201).json({ token });
});

app.get('/user/:id', authToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findByPk(id);
    // console.log(user, 'findbypk user');
    const userFound = {
        id: user.dataValues.id,
        displayName: user.dataValues.displayName,
        email: user.dataValues.email,
        image: user.dataValues.image,
      };
      console.log('userFound', userFound);
    return res.status(200).json(userFound);
  } catch (err) {
    return res.status(404).json({ message: 'User does not exist' });
  }
});

app.get('/user', authToken, async (req, res) => {
  try {
    const users = await User.findAll();
    console.log('users lista', users);
    const mapUsers = users.map((user) => (
      {
        id: user.dataValues.id,
        displayName: user.dataValues.displayName,
        email: user.dataValues.email,
        image: user.dataValues.image,
      }
      ));
    return res.status(200).json(mapUsers);
  } catch (err) {
    return res.status(400).json({ message: 'usuários não encontrados' });
  }
});

app.post('/categories', 
// authLogin, 
// authUserEmail,
authToken,
categoryName, async (req, res) => {
  const { name } = req.body;
  // console.log(name, "NAME<<<<<");
   const newCategory = await Category.create({ name });
  //  console.log(newCategory, 'newCategory');
  // const jwtConfig = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };
  //   const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(201).json(newCategory);
});

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
