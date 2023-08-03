import React, {useEffect, useState} from 'react';
import axios from "axios";

const patientData = {
    name: '',
    dateOfBirth: '',
    idNo: '',
    address: '',
    county: '',
    subCounty: '',
    telephone: '',
    email: '',
    gender: '',
    maritalStatus: ''
};

const nextOfKinData = {
    name: '', dateOfBirth: '', idNo: '', telephone: '', relationship: '', gender: '',
};
const DataForm = () => {
    const [patient, setPatient] = useState(patientData)

    const [nextOfKin, setNextOfKin] = useState(nextOfKinData)

    const [patientErrors, setPatientErrors] = useState(patientData)

    const [nextOfKinErrors, setNextOfKinErrors] = useState(nextOfKinData)


    useEffect(() => {
        console.log('use')
        console.log(patientErrors)
    }, [patientErrors]);


    const handlePatientChange = (event) => {
        const {name, value} = event.target;
        setPatient({...patient, [name]: value})
    }


    const handleNextOfKinChange = (event) => {
        const {name, value} = event.target;
        setNextOfKin({...nextOfKin, [name]: value})
    }


    const validateForm = () => {
            console.log('in loop')
            for (const key in patient) {
                console.log(key)
                const value = patient[key];
                if (!value.trim()) {
                    setPatientErrors({...patientErrors, [key]: `${key} is required`})
                    return;
                } else {
                    console.log(patientErrors)
                    setPatientErrors(prevState => ({...prevState, [key]: ''}))
                    console.log('done')
                    console.log(patientErrors)
                }
            }

            
            for (const key in nextOfKin) {
                const value = patient[key];
                if (!value.trim()) {
                    setNextOfKinErrors({...nextOfKinErrors, [key]: `${key} is required`})
                    return;
                } else {
                    setNextOfKinErrors({...nextOfKinErrors, [key]: ''})
                }
            }
        }
    ;

    const submit = async (e) => {
        e.preventDefault();
        validateForm();

        const data = {
            patientData: patient,
            nextOfKinData: nextOfKin
        }

        try {
            const response = await axios.post("http://localhost:8082/patient", data)
            console.log(response)
        } catch (e) {
            console.log('error', e)
        }
    }


    return (<div className="form-container">
        <h2>Patient</h2>
        <div className="input-container">
            <div className="input">
                <div className="form-input">
                    <label>Name</label>
                    <input placeholder="Name"
                           name="name"
                           value={patient.name}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.name && <div className="error">{patientErrors.name}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Date Of Birth</label>
                    <input placeholder="date of birth"
                           type="date" name="dateOfBirth"
                           value={patient.dateOfBirth}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.dateOfBirth && <div className="error">{patientErrors.dateOfBirth}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Id NO</label>
                    <input placeholder="id no"
                           name="idNo"
                           value={patient.idNo}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.idNo && <div className="error">{patientErrors.idNo}</div>}
            </div>

            <div className="input">
                <div className="form-input">
                    <label>Address</label>
                    <input placeholder="address"
                           name="address"
                           value={patient.address}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.address && <div className="error">{patientErrors.address}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>County</label>
                    <input placeholder="county"
                           name="county"
                           value={patient.county}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.county && <div className="error">{patientErrors.county}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Sub County</label>
                    <input placeholder="sub county"
                           name="subCounty"
                           value={patient.subCounty}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.subCounty && <div className="error">{patientErrors.subCounty}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Telephone</label>
                    <input placeholder="telephone"
                           name="telephone"
                           value={patient.telephone}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.telephone && <div className="error">{patientErrors.telephone}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Email</label>
                    <input placeholder="email"
                           type="email"
                           name="email"
                           value={patient.email}
                           onChange={handlePatientChange}
                    />
                </div>
                {patientErrors.email && <div className="error">{patientErrors.email}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Gender</label>
                    <select value={patient.gender} name="gender" onChange={handlePatientChange}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                {patientErrors.gender && <div className="error">{patientErrors.gender}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Marital Status</label>
                    <select value={patient.maritalStatus} name="maritalStatus" onChange={handlePatientChange}>
                        <option value="single">single</option>
                        <option value="married">married</option>
                    </select>
                </div>
                {patientErrors.maritalStatus && <div className="error">{patientErrors.maritalStatus}</div>}
            </div>
        </div>
        <h2>Next Of Kin</h2>
        <div className="input-container">
            <div className="input">
                <div className="form-input">
                    <label>Name</label>
                    <input placeholder="Name"
                           name="name"
                           value={nextOfKin.name}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.name && <div className="error">{nextOfKinErrors.name}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Date Of Birth</label>
                    <input placeholder="date of birth"
                           type="date"
                           name="dateOfBirth"
                           value={nextOfKin.dateOfBirth}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.dateOfBirth && <div className="error">{nextOfKinErrors.dateOfBirth}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Id NO</label>
                    <input placeholder="id no"
                           name="idNo"
                           value={nextOfKin.idNo}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.idNo && <div className="error">{nextOfKinErrors.idNo}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Gender</label>
                    <select name="gender" value={nextOfKin.gender} onChange={handleNextOfKinChange}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                {nextOfKinErrors.gender && <div className="error">{nextOfKinErrors.gender}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>RelationShip</label>
                    <input placeholder="relationship"
                           name="relationship"
                           value={nextOfKin.relationship}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.relationship && <div className="error">{nextOfKinErrors.relationship}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Telephone</label>
                    <input placeholder="telephone"
                           name="telephone"
                           value={nextOfKin.telephone}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.telephone && <div className="error">{nextOfKinErrors.telephone}</div>}
            </div>
        </div>
        <button className="register-btn" onClick={submit}>Register</button>
    </div>);
};

export default DataForm;
