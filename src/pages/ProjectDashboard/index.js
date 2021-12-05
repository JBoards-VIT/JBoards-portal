import React, { useState, useEffect } from 'react'
import "./style.scss"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import axios from "../../axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProjectDashboard = () => {
    const history = useHistory()
    const { id } = useParams()
    const [projectDetails, setProjectDetails] = useState(null)
    useEffect(() => {
        const getProjectDetails = () => {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            axios.get(`/project/${id}`, config).then((response) => {
                if (response.data.status === "success") {
                    setProjectDetails(response.data.result)
                }
                else {
                    history.replace("*")
                }
            }).catch((error) => console.log(error))
        }
        getProjectDetails()
    }, [id, history])
    return (
        <div className="projectDashboard">
            <div className="projectAccessCode">
                <CopyToClipboard text={projectDetails?.project?.accessCode}>
                    <IconButton>
                        <ContentCopyIcon />
                    </IconButton>
                </CopyToClipboard>
                <span>Copy Project Access Code</span>
            </div>
            <div className="projectMembers">
                <h2>Project Members</h2>
                <div className="projectMembersTable">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="center">Registration Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projectDetails?.members?.map((member) => (
                                    <TableRow
                                        key={member._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {member.name}
                                        </TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell align="center">{member.registrationNumber ? member.registrationNumber : "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default ProjectDashboard
