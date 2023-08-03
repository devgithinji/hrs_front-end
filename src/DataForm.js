import React from 'react';

const DataForm = () => {
    return (
       <div>
           <div>
               <div className="form-input">
                   <label>Name</label>
                   <input placeholder="Name"/>
               </div>
               <div className="form-input">
                   <label>Date Of Birth</label>
                   <input placeholder="date of birth" type="date"/>
               </div>
               <div className="form-input">
                   <label>Id NO</label>
                   <input placeholder="id no"/>
               </div>
               <div className="form-input">
                   <label>Address</label>
                   <input placeholder="address"/>
               </div>
               <div className="form-input">
                   <label>County</label>
                   <input placeholder="county"/>
               </div>
               <div className="form-input">
                   <label>Sub County</label>
                   <input placeholder="sub county"/>
               </div>
               <div className="form-input">
                   <label>Telephone</label>
                   <input placeholder="telephone"/>
               </div>
               <div className="form-input">
                   <label>Email</label>
                   <input placeholder="email"/>
               </div>
               <div className="form-input">
                   <label>Gender</label>
                   <select>
                       <option>male</option>
                       <option>female</option>
                   </select>
               </div>
               <div className="form-input">
                   <label>Marital Status</label>
                   <select>
                       <option>single</option>
                       <option>married</option>
                   </select>
               </div>
           </div>
           <div>
               <div className="form-input">
                   <label>Name</label>
                   <input placeholder="Name"/>
               </div>
               <div className="form-input">
                   <label>Date Of Birth</label>
                   <input placeholder="date of birth" type="date"/>
               </div>
               <div className="form-input">
                   <label>Id NO</label>
                   <input placeholder="id no"/>
               </div>
               <div className="form-input">
                   <label>Gender</label>
                   <select>
                       <option>male</option>
                       <option>female</option>
                   </select>
               </div>
               <div className="form-input">
                   <label>RelationShip</label>
                   <input placeholder="relationship"/>
               </div>
               <div className="form-input">
                   <label>Telephone</label>
                   <input placeholder="telephone"/>
               </div>
           </div>
       </div>
    );
};

export default DataForm;
