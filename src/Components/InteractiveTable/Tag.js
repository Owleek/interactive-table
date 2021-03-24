import React from 'react';

const Tag = ({ content, callback }) => {
    return (
        <div className="tag">
            <small>
               { content }
            </small>
            <small className="tag__close" onClick={callback}>
                x
            </small>
        </div>
    )
}   

export default Tag