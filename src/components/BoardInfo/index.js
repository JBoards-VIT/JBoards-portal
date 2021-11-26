import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import Editable from "../Editable"
import { useDispatch, useSelector } from 'react-redux';
import { changeBoardTitle } from "../../redux/actions/Board";
import "../CardInfo/style.scss";
const BoardInfo = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.boards[props.boardIndex])
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
                            hasValue={board?.title ? true : false}
                            text={board?.title || "Add Title"}
                            label="Title"
                            editStyle={editableStyle}
                            onSubmit={(value) => dispatch(changeBoardTitle(value, board?.id))}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
})

export default BoardInfo
