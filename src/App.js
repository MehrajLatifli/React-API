import './App.css';
import { useState, useEffect } from 'react';



function App() {
  
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);

  }

  const fetchUsersById = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    setFormData(data);

  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    phone: '',
    username: '', 
    website: '', 
  });



  const { id, name, email, phone,username, website } = formData;




  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };



  const onSubmitHandler = async e => {

    e.preventDefault();

    const response = await fetch('https://jsonplaceholder.typicode.com/users', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name, email, phone })
      
    });



    const data = await response.json();



    setUsers([...users, { ...data, id: users.length + 1 }]);


    setFormData({
      id:'',
      name: '',
      email: '',
      phone: '',
      username: '', 
      website: '', 
    });


  };
  

  const [userId, setUserId] = useState(0);

  const getUserById = userId => {

    const user = users.find((user) => user.id === userId);

  const filteredElements = userId
    ? users.filter((element) => element.id === parseInt(userId))
    : users;


    // if (user) {

    //   fetchUsersById(userId);

    // }
    return filteredElements;
  };




  
  const onUserIdChangeHandler = (event) => {
    const value = parseInt(event.target.value);
    setUserId(value);

    console.log(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    getUserById(userId);

    
  };





  return (

<div className="App" style={{display: "table", width:"50%", marginRight: "auto", marginLeft: "auto", }}>




<form onSubmit={onSubmitHandler}>


        <div className="form-group"  >
          <input type="text" name='name'  value={name} onChange={onChangeHandler} className="form-control" id="name" placeholder="Enter name"/>
        </div>


    

        <div className="form-group"  >
          <input type="text" name='username'  value={username} onChange={onChangeHandler} className="form-control" id="username" placeholder="Enter username"/>
        </div>
 


        <div className="form-group"  >
          <input type="text" name='phone'  value={phone} onChange={ onChangeHandler} className="form-control" id="phone" placeholder="Enter phone"/>
        </div>



        <div className="form-group"  >
          <input type="text" name='website'  value={website} onChange={ onChangeHandler} className="form-control" id="website" placeholder="Enter website"/>
        </div>



        <div className="form-group"  >
          <input type="text" name='email'  value={email} onChange={onChangeHandler} className="form-control" id="email" placeholder="Enter email"/>
        </div>


    <button type="submit" className="btn btn-primary"  style={{width:"100%" }}>Add</button>

  </form>

<br/>
<br/>

<form onSubmit={handleSubmit}>
<div className="form-group"  >
  <input type="number"  min="0" max="10000" value={userId} onChange={onUserIdChangeHandler} style={{width:"100%" }}/>
  </div>

</form>

<br/>
<br/>

  <table className="table" style={{width:"100%" }}>
  <thead className="bg-primary">
    <tr>
      <th scope="col" className="text-light">#</th>
      <th scope="col" className="text-light">name</th>
      <th scope="col" className="text-light">username</th>
      <th scope="col" className="text-light">email</th>
      <th scope="col" className="text-light">phone</th>
      <th scope="col" className="text-light">website</th>
    </tr>
  </thead>
    <tbody>

     {userId<=0 &&

    users.map((item, index) => ( 
      

    
       <tr  key={item.id}>

          <th scope="row"  >{item.id} </th>
          <td>{item.name}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.website}</td>

       </tr>
       ))}

      {userId>0 &&

         getUserById(userId).map((item) => ( 
      

    
          <tr  key={item.id}>

          <th scope="row"  >{item.id} </th>
          <td>{item.name}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.website}</td>
          
        </tr>
       ))}




    </tbody>
  </table>




   


    </div>
  );
}

export default App;
