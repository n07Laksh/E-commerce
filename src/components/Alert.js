import React from 'react'

function Alert(props) {
    function changeMode(word) {
        if (word === 'danger') return word = "Error";
        if (word === "success") return word = "Success";
        if (word === "warning") return word = "Warning";
    }
    return (
        props.alert && <div>
            <div className={`alert alert-${props.alert.mode} alert-dismissible fade show`} role="alert">
                <strong>{changeMode(props.alert.mode)}</strong> {props.alert.msg}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default Alert
