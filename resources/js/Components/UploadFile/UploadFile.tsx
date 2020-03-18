import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../Model/model'

import './UploadFile.scss'

interface Props {
    
}
const UploadFile: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <form>
        <div className="form-group">
          <label>Example file input</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1"></input>
        </div>
      </form> 
    )
}
export default UploadFile;