import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import Editable from "../Editable"
import { useDispatch } from 'react-redux';
import { changeBoardTitle } from "../../redux/actions/Board";
import "../CardInfo/style.scss";
import axios from "../../axios"

const BoardInfo = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth <= 769 ? "90vw" : "30vw",
        bgcolor: 'background.paper',
        boxShadow: 24,
        maxHeight: "95vh",
        overflowY: "auto",
        p: window.innerWidth <= 769 ? 1 : 4,
    };
    const closeButtonStyle = {
        position: 'absolute',
        top: '5px',
        right: '5px',
    }
    const editableStyle = {
        width: "280px",
    }
    const ChangeBoardTitle = (title, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            name: title,
            boardId,
            kanbanId: props?.kanbanId
        }
        axios.post("/kanban/board/update", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeBoardTitle(title, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Box {...props} ref={ref} sx={modalStyle}>
            <div className="cardInfo custom-scroll">
                {window.innerWidth <= 769 && (
                    <IconButton style={closeButtonStyle} onClick={props.close}>
                        <CloseIcon />
                    </IconButton>
                )}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <TitleIcon />
                        Title
                    </div>
                    <div className="cardInfo_box_body">
                        <Editable
                            hasValue={props?.board?.title ? true : false}
                            text={props?.board?.title || "Add Title"}
                            label="Title"
                            editStyle={editableStyle}
                            onSubmit={(value) => ChangeBoardTitle(value, props?.board?._id)}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
})

export default BoardInfo
