// import React, { useState } from 'react';

// const ComplaintForm = () => {
//   const [formData, setFormData] = useState({
//     pincode: '',
//     state: '',
//     city: '',
//     country: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/complain', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert('Complaint submitted successfully: ' + JSON.stringify(result));
//       } else {
//         alert('Failed to submit the complaint. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//       alert('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="input-field block1">
//         <div className="grid-item">
//           <label htmlFor="pincode">Pincode</label>
//           <input
//             type="number"
//             id="pincode"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="grid-item">
//           <label htmlFor="state">State</label>
//           <input
//             type="text"
//             id="state"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="grid-item">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="grid-item">
//           <label htmlFor="country">Country</label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ComplaintForm;
