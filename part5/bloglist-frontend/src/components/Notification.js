const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="msg">
        {message}
      </div>
    )
  }

const Warning = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
  export {Notification, Warning}