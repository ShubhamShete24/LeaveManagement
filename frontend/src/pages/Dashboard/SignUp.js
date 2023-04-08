import React from 'react';
import '../../signup.css';
import mainLogo from '../../assets/images/5.jpg';

function SignUp() {
  const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };
  return (
    <div>
      <section>
        <div className="container">
          {/* sign in  */}
          <div className="user signinBx">
            <div className="imgBx">
              <img src={mainLogo} alt="logo" />
            </div>
            <div className="formBx">
              <form method="POST" action="">
                <h2>Sign In</h2>
                <input type="hidden" name="formType" value="signin" />
                <input type="text" name="username" placeholder="Username" value="Admin" />
                <input type="password" name="password" placeholder="Password" value="Admin" />
                <a href="index.html">
                  <input type="button" value="Login" onClick="validate()" />
                </a>

                <p className="signup" style={{ color: 'black' }}>
                  Don't have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* sign up */}
          <div className="user signupBx">
            <div className="formBx">
              <form method="POST">
                <h2>Create an Account</h2>
                <input type="hidden" name="formType" value="signup" />
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email Id" />
                <input type="password" name="password" placeholder="Create Password" />
                <input type="password" name="" placeholder="Confirm Password" />
                <input type="submit" name="" value="Sign Up" />
                <p className="signup" style={{ color: 'black' }}>
                  Already have an account ?
                  <a href="#" onClick={toggleForm}>
                    {' '}
                    Sign In{' '}
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src={mainLogo} alt="logo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
