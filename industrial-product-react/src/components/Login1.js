const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');
  export default function Login1(){

  const submitData = () => {
    fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
      .then(response => {
        alert("in response")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        //setInfo(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div>
      <form>
                <label>Enter Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                />
                <br />
                <label>Enter Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                />
                <br />
                <input 
                    type="submit" 
                    value="Login" 
                    onClick={submitData} 
                />
                <input 
                    type="reset" 
                    value="Clear" 
                    onClick={() => dispatch({ type: "reset" })} 
                />
                <div 
                    style={colour} 
                    onMouseOver={() => setColour({ color: 'blue' })} 
                    onMouseLeave={() => setColour({ color: 'red' })}
                    onClick={() => navigate('/forgotpassword')}
                >
                   
                </div>
            </form>
            <p>{info}</p>
    </div>
  );
  }
