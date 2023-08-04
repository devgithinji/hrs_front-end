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

const messageData = {
    name: '',
    refNo: '',
    message: ''
}
const DataForm = () => {
    const [patient, setPatient] = useState(patientData)

    const [nextOfKin, setNextOfKin] = useState(nextOfKinData)

    const [patientErrors, setPatientErrors] = useState(patientData)

    const [nextOfKinErrors, setNextOfKinErrors] = useState(nextOfKinData)
    const [message, setMessage] = useState(messageData)

    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const errorTimeOut = setTimeout(() => {
            setError('')
        }, 2000)


        const messageTimeOut = setTimeout(() => {
            setMessage(messageData)
        }, 2000)


        return () => {
            clearTimeout(errorTimeOut);
            clearTimeout(messageTimeOut);
        }
    }, []);


    const handlePatientChange = (event) => {
        const {name, value} = event.target;
        setPatient({...patient, [name]: value})
    }


    const handleNextOfKinChange = (event) => {
        const {name, value} = event.target;
        setNextOfKin({...nextOfKin, [name]: value})
    }


    const isEmailValid = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!email.match(emailPattern);
    }

    const validateForm = () => {
            let isValid = true;
            const newPatientErrors = {};
            for (const key in patient) {
                const value = patient[key];
                if (!value.trim()) {
                    newPatientErrors[key] = `${key} is required`;
                    isValid = false;
                } else if (key === 'email' && !isEmailValid(value)) {
                    newPatientErrors[key] = `invalid ${key}`;
                    isValid = false;

                } else {
                    newPatientErrors[key] = '';
                }
            }
            setPatientErrors(newPatientErrors)

            const newNextOfKinErrors = {};
            for (const key in nextOfKin) {
                const value = nextOfKin[key];
                if (!value.trim()) {
                    newNextOfKinErrors[key] = `${key} is required`;
                    isValid = false;
                } else {
                    newNextOfKinErrors[key] = '';
                }
            }
            setNextOfKinErrors(newNextOfKinErrors)

            return isValid;
        }
    ;

    const submit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (!isValid) return;

        const data = {
            patientData: patient,
            nextOfKinData: nextOfKin
        }

        try {
            setIsLoading(true)
            const response = await axios.post(process.env.REACT_APP_API_URL, data)
            if (response.status === 200) {
                setMessage(response.data)
                resetForm()
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const {data, status} = e.response;

                if (status === 422) {
                    for (const key in data.errors) {
                        const [personType, fieldName] = key.split(".");

                        if (personType === 'patientData') {
                            setPatientErrors(prevState => ({...prevState, [fieldName]: data.errors[key]}))
                        } else {
                            setNextOfKinErrors(prevState => ({...prevState, [fieldName]: data.errors[key]}))
                        }
                    }
                } else {
                    setError(data.error)
                }

            } else {
                setError(e.message)
            }


            setIsLoading(false)
        }
    }


    const resetForm = () => {
        setIsLoading(false);
        setPatient(patientData)
        setNextOfKin(nextOfKinData)
        setPatientErrors(patientData)
        setNextOfKinErrors(nextOfKinData)
    }

    const today = new Date().toISOString().split('T')[0];


    return (<div className="form-container">
        <h2>Patient</h2>
        {error && <div className="message error-message">{error}</div>}
        {message.name && (
            <div className="message success-message">
                <p>Success</p>
                <p>{message.name}</p>
                <p>RefNo: {message.refNo}</p>
                <p>{message.message}</p>
            </div>
        )}
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
                           max={today}
                           onChange={handlePatientChange}/>
                </div>
                {patientErrors.dateOfBirth && <div className="error">{patientErrors.dateOfBirth}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Id NO</label>
                    <input placeholder="id no"
                           name="idNo"
                           type="number"
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
                           type="number"
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
                        <option disabled value="">Select gender</option>
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
                        <option disabled value="">Select marital status</option>
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
                           max={today}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.dateOfBirth && <div className="error">{nextOfKinErrors.dateOfBirth}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Id NO</label>
                    <input placeholder="id no"
                           name="idNo"
                           type="number"
                           value={nextOfKin.idNo}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.idNo && <div className="error">{nextOfKinErrors.idNo}</div>}
            </div>
            <div className="input">
                <div className="form-input">
                    <label>Gender</label>
                    <select name="gender" value={nextOfKin.gender} onChange={handleNextOfKinChange}>
                        <option disabled value="">Select gender</option>
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
                           type="number"
                           name="telephone"
                           value={nextOfKin.telephone}
                           onChange={handleNextOfKinChange}/>
                </div>
                {nextOfKinErrors.telephone && <div className="error">{nextOfKinErrors.telephone}</div>}
            </div>
        </div>
        <button className="register-btn" onClick={submit}
                disabled={isLoading}>{isLoading ? 'PLease wait ...' : 'Register'}</button>
    </div>);
};

export default DataForm;
