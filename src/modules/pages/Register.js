import React from 'react';

const Register = () => {
  return (
    <div>
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
    </div>
  )
};
export default Register;
