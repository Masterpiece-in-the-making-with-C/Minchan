let express = require('express');
let bodyParser = require('body-parser');

let abc = express();
let PORT = 3000;
let usernamedata=[];
let a = true;

abc.use(bodyParser.urlencoded({ extended: true }));
abc.use(bodyParser.json());
abc.use(express.static('public'));

abc.get('/', (req, res) => {
  res.sendFile(__dirname + '/과제/20233093.html');
});

abc.post('/signup', (req, res) => {
  a = true;
  let username = req.body.username;
  let password = req.body.password;
  
  for(let i = 0; i <usernamedata.length; i++){
    if(usernamedata[i]==username){
      a=false;
    }
  }
 
  if (a === false) {
    res.json({ success: false, message: '이미 사용자가 있습니다.' });
  } else if (password !== req.body.confirmPassword) {
    res.json({ success: false, message: '비밀번호가 틀렸습니다.' });
  } else {
  
    global.users = global.users || [];
    global.users.push({ username, password });
    res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
    usernamedata.push(username);
  }
});

abc.get('/users', (req, res) => {
  res.json({ users: global.users || [] });
});

abc.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
