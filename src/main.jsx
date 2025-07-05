// // import { StrictMode } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { useState } from 'react';
// // import Search from './search';
// // function App() {
// //   const [like, setLike] = useState(0);
// //   const [dislike, setDislike] = useState(0);
// //   const [inputText, setInputText] = useState('');

// //   // // ✅ Profile useState
// //   // const [name, setName] = useState('');
// //   // const [email, setEmail] = useState('');
// //   // const [profile, setProfile] = useState(null);
    

// //   // function increaseLike() {
// //   //   setLike(like + 1);
// //   // }

// //   // function increaseDislike() {
// //   //   setDislike(dislike + 1);
// //   // }

// //   // function InputChange(event) {
// //   //   setInputText(event.target.value);
// //   // }

// //   // ✅ Profile submission handler
// //   // function handleProfileSubmit(e) {
// //   //   e.preventDefault();
// //   //   setProfile({ name, email });
// //   // }
// //   // ✅ Profile submission handler
// //   // function handleClick(e) {
// //   //   e.preventDefault();
// //   //   const inputValue = e.target.previousSibling.value;
// //   //   console.log('Search clicked with input:', inputValue);
// //   //   App.getElementById('root').innerHTML = `<h1>Search Result for: ${inputValue}</h1>`;
    
// //   // }


// //   return (
// //     <>
  
      
// //       {/* <h1>Hello world!</h1>

// //       <p> Likes: {like}</p>
// //       <p> Dislikes: {dislike}</p>

// //       <button onClick={increaseLike}> Like</button>
// //       <button onClick={increaseDislike}> Dislike</button>

// //       <br /><br />

// //       <input
// //         type="text"
// //         placeholder="Type something here..."
// //         value={inputText}
// //         onChange={InputChange}
// //       />
// //       <p>You typed: <strong>{inputText}</strong></p>

// //       <h2>{inputText}</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>{inputText}A</th>
// //             <th>{inputText}B</th>
// //             <th>{inputText}C</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr>
// //             <td>1</td>
// //             <td>2</td>
// //             <td>3</td>
// //           </tr>
// //           <tr>
// //             <td>4</td>
// //             <td>5</td>
// //             <td>6</td>
// //           </tr>
// //           <tr>
// //             <td>7</td>
// //             <td>8</td>
// //             <td>9</td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       <hr />
// //       <h2>Create Profile</h2>

// //       <form onSubmit={handleProfileSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         /> <br /><br />
// //         <input
// //           type="email"
// //           placeholder="Enter email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         /> <br /><br />
// //         <button type="submit">Save Profile</button>
// //       </form>

// //       {profile && (
// //         <>
// //           <h3>Profile Info</h3>
// //           <table border="1">
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <tr>
// //                 <td>{profile.name}</td>
// //                 <td>{profile.email}</td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </>
// //       )} */}
// //     </>
// //   );
// // }

// // createRoot(document.getElementById('root')).render(<StrictMode>
// //   <Search/>
// //   </StrictMode>);



// import { createRoot } from 'react-dom/client';
// import Api from "./Apii.jsx"; // ✅ correct as your file is Apii.jsx

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<Api />);


import React from "react";
import ReactDOM from "react-dom/client";
import AppSearch from "./App"; // adjust path if needed


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppSearch />
  </React.StrictMode>
);