import { Spinner } from "react-bootstrap";
import "./CustomSpinner.scss";

export default function CustomSpinner() {
    return (
        <div className='custom-spinner-container'>
        <Spinner className='custom-spinner' animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
    );
}