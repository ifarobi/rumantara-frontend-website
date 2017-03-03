import React from 'react';

const Login = () => {
  return (
    <div>
      <h2 className="text-center">Hello From Login</h2>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  )
};
export default Login;
