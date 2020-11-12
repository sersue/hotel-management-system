const users = [
    { email: 'kim', password: '123', name: 'Kim' },
    { email: 'lee', password: '456', name: 'Lee' },
    { email: 'park', password: '789', name: 'Park' }
  ]
  
  export default function signIn( inemail, inpassword ) {
    const user = users.find(user => user.email === inemail && user.password === inpassword);
    if (user === undefined) return null;//throw new Error();
    return user;
  }
