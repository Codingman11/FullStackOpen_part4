const Notification = ({notificationMessage, notificationType}) => {
    if (notificationMessage === null){
        return null
    }
    const noticationStyle = notificationType === 'error' ? 'error' : 'success';
 
    return (
        <div className={`notification ${noticationStyle}`}>
            {notificationMessage}
        </div>
    )
}

export default Notification

   //Alternative styling method

    // const style = {
    //     color: 'green',
    //     background: 'lightgrey',
    //     fontSize: '20px',
    //     borderStyle: 'solid',
    //     borderRadius: '5px',
    //     padding: '10px',
    //     marginBottom: '10px'
    // }
    // return (
    //     <div style={style}>
    //         {notificationMessage}
    //     </div>
    // )