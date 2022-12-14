import styles from "./CreateCategoryModal.module.css";
import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TextField } from "@mui/material";

function CreateCategoryModal(props) {
    const [cookie] = useCookies();
    const navigate = useNavigate();
    const formRef = useRef();
    const user = useSelector(state => state.user)
    const courseIdredux = useSelector(state => state.getCourseIdOnClick.getCourseIdOnClick);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            courseId: courseIdredux,
            userId: user.userInfo.user.id,
            categoryName: formRef.current.categoryName.value,
        }

        console.log(data);

        axios.post("http://localhost:5000/api/poolCategory", data, { withCredentials: true }, { headers: { Authorization: `Bearer ${cookie.token}` } }).then((res) => {
            console.log(res);
            toast.success('Category Created', {
                position: toast.POSITION.TOP_RIGHT,
            })
            props.closeModalHandler();
        }).catch((err) => {
            console.log(err);
            toast.error('Category Created failed', {
                position: toast.POSITION.TOP_RIGHT,
            })
        })
    }

    return (
        <>
            <div onClick={() => { props.closeModalHandler() }} className={`${styles.CreateCategoryModalBackground}`}>
            </div>
            <div onClick={() => { }} className={styles.CreateCategoryModal}>
                <form style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }} ref={formRef} onSubmit={formSubmitHandler}>
                    <h2 className={styles.h2} style={{ height: "15%", marginBottom: '15px', textAlign: "center", fontSize: '25px', color: 'var(--primary)', fontWeight: "500" }}>Create Category</h2>
                    <TextField className="!h-[20px] w-[240px] " name="categoryName" type={"text"} id="outlined-basic" label="Category Name" variant="outlined" required />
                    <div className={styles.btnDiv}>
                        <button style={{ background: "White", color: "black", border: "2px solid black", boxShadow: "0px 0px 0px #000" }} className="button" onClick={() => { props.closeModalHandler() }}>Close</button>
                        <button className="button" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCategoryModal;