import React from "react";

const NumOfWordsInput = ({onChange, value, readOnly}) => {
    return <input 
        type="number" 
        className="form-control py-1" 
        onChange={onChange}
        placeholder="Number of words..."
        value={value}
        readOnly={readOnly} />
}

export default NumOfWordsInput;