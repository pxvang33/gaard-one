//Set QR Code
const displayQrCode = (state=[], action) => {
    switch (action.type) {
      case 'SET_QR_CODE':
        return action.payload;
      default:
        return state;
    }
  }

export default displayQrCode;