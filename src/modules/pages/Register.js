import React from 'react';

import Primary from '../components/templates/Primary';

const Register = () => {
  return (
    <Primary>
      <h2 className="text-center">Hello From Register</h2>
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1"/>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-default">Daftar</button>
      </form>
    </Primary>
  )
};
export default Register;
