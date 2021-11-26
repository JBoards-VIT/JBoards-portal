import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./style.scss";
import { useRef, useState } from "react";
import CustomTextField from "../CustomTextField/index";
import IconButton from "@mui/material/IconButton";

export default function Editable(props) {
    const formRef = useRef(null);
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(
        props.hasValue ? props.text : ""
    );
    return (
        <div className="editable">
            {showEdit ? (
                <form
                    className={`editable_edit`}
                    ref={formRef}
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (props.onSubmit) {
                            if (inputValue && inputValue.trim().length > 0) {
                                props.onSubmit(inputValue);
                                setInputValue("");
                                setShowEdit(false);
                            }
                        }
                    }}
                >
                    <div style={props.editStyle || null}>
                        <CustomTextField
                            type="text"
                            label={props.label}
                            value={inputValue}
                            handleChange={(event) => setInputValue(event.target.value)}
                        />
                    </div>
                    <div className="editable_edit_footer">
                        <IconButton aria-label="close" onClick={() => setShowEdit(false)}>
                            <HighlightOffIcon />
                        </IconButton>
                        <IconButton aria-label="add" type="submit">
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </div>
                </form>
            ) : (
                <p
                    className={` editable_display`}
                    style={props.displayStyle || null}
                    onClick={() => setShowEdit(true)}
                >
                    {props.text || "Add Card"}
                </p>
            )
            }
        </div >
    );
}
