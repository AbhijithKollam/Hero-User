import React, { useEffect, useState } from 'react';
import img1 from '../Assets/image2.jpg';
import Header from '../Components/Header';
import { complaintApi, getUserCmpApi } from '../Services/allApi';
import Bot from '../Components/Bot';

function Complaints() {
    // State to manage modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [complaintData, setComplaintData] = useState({
        name: "",
        email: "",
        complaint: "",
        userId: ""

    })
    useEffect(() => {
        // Retrieve and parse the existing user data from localStorage
        const userData = JSON.parse(localStorage.getItem("existingUser"));
        console.log(userData, "user data");
        getUserCmp()

        if (userData) {
            // Update complaintData state with userData values
            setComplaintData({
                name: userData.username,
                email: userData.email,
                userId: userData.unqId, 
            });
        }
    }, []); // Empty dependency array ensures this runs only once on component mount

    // Function to open the modal
    const openModal = () => {
        setIsModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    //get user complaints
    const getUserCmp = async () => {
        const data = JSON.parse(localStorage.getItem("existingUser"));
        console.log(data, "data in useeffect");
        const id = data.unqId
        console.log(id, "id==");
        if (id) {
            const result = await getUserCmpApi(id);
            setComplaints(result.data.data)
        }
    }

    const sendComplaint = async () => {
        const { complaint } = complaintData
        if (!complaint) {
            alert("Type complaint without fearing anyone...")
        }
        else {

            const result = await complaintApi(complaintData);
            console.log(result, "result comp");
            closeModal();
            if (result.status === 200) {
                alert("Complaint Registered")
                getUserCmp()
            }
            else {
                alert(result.response.data)
            }

        }
    }
    const truncateComplaint = (complaintText) => {
        const words = complaintText.split(' ');
        if (words.length > 1) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return complaintText;
    };

    return (
        <div>
            <Header />
            {/* Carousel section */}
            <div className='carousel slide'>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt=" one" />
                    </div>
                </div>
                <div className="carousel-caption-s">
                    <h1 className='title'>COMPLAINTS</h1>
                </div>
            </div>

            {/* Complaint details section */}
            <div className="complaint-details">
                <h4>If you have any complaints, feel free to let us know</h4>
                <p>Click here to register your complaint</p><br />
                <div>
                    <i className="fa-regular fa-hand-point-down arrow-icon"></i><br />
                </div>
                <button className="complaint-btn" onClick={openModal}>
                    Complaint
                </button>
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Submit Your Complaint</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Form inside the modal */}
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input
                                            // onChange={(e) => setComplaintData({ ...complaintData, name: e.target.value })}
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter your name"
                                            value={complaintData.name}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Your Email</label>
                                        <input
                                            // onChange={(e) => setComplaintData({ ...complaintData, email: e.target.value })}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={complaintData.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="complaint" className="form-label">Your Complaint</label>
                                        <textarea
                                            onChange={(e) => setComplaintData({ ...complaintData, complaint: e.target.value })}
                                            className="form-control"
                                            id="complaint"
                                            rows="4"
                                            placeholder="Describe your complaint"
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={sendComplaint}>
                                    Submit Complaint
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="complaints-table p-5">
                <table className="table table-striped" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th scope="col">Complaint ID</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Complaint</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length > 0 ? (
                            complaints.map((complaint, index) => (
                                <tr key={index}>
                                    <td>{complaint.cmpId}</td>
                                    <td>{new Date(complaint.createdAt).toLocaleString()}</td>
                                    <td>{truncateComplaint(complaint.complaint)}</td>
                                    <td className={`status ${complaint.status.toLowerCase()}`}>
                                        {complaint.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center'>No complaints found from yourself.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div>
                <Bot/>
            </div>
            
        </div>
    );
}

export default Complaints;
