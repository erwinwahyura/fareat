import axios from 'axios'
// import { withRouter } from 'react-router'

export const Get_Flag_SignIn = () => {
  return {
    type: 'GET_FLAG',
    payload: 'issignin'
  }
}

export const clearMoodAndRawData = () => {
  return {
    type: 'CLEAR_MOOD_AND_RAW_DATA',
    payload: []
  }
}

export const checkCurrentUser = (id, username) => {
  //console.log("actions.js masuk props.checkCurrentUser");
  return (dispatch, getState) => {
    axios.get('https://erwar.id/api/users/' + id)
    .then((resp) => {
      if (resp.data.username === username) {
        // console.log(resp.data);
        // this.getAbsentListCurrUser()
        // dispatch(Flag_Login())
        dispatch(setCurrUser({
          name: resp.data.name,
          username: resp.data.username,
          _id: resp.data._id
        }))
        //console.log('usernya benar');
      } else {
        //console.log('usernya salah');
        localStorage.clear()
      }
    })
    .catch((err) => {
      //console.log('err dari checkCurrentUser',err)
      localStorage.clear()
      dispatch(updateResponseCheckCurrentUser("error"))
      // this.setState({
      //   responseCheckCurrentUser: "error"
      // })
    })
  }
}

export const updateResponseCheckCurrentUser = (data) => {
  return {
    type: "RESPONSE_CHECK_CURR_USER",
    payload: data
  }
}

export const getAbsentListCurrUser = (id) => {
    return {
      type: 'GET_ABSENT_LIST',
      payload: axios.get('https://erwar.id/api/absents/user/'+id)
    }
}

export const updateAbsentListCurrUser = (data) => {
  return {
    type: 'UPDATE_ABSENT_LIST',
    payload: data
  }
}

export const deleteAbsent = (id) => {
  return (dispatch, getState) => {
    axios.delete('https://erwar.id/api/absents/'+id)
    .then(response => {
      dispatch(getAbsentListCurrUser(id))
    })
    .catch(err => console.log(err))
  }
}

export const Get_Flag_SignUp = () => {
  return {
    type: 'GET_FLAG_SIGNUP',
    payload: 'issignup'
  }
}

export const updateRawData = (data, obj=null) => {
  return {
    type: 'UPDATE_RAW_DATA',
    payload: {
      data: data,
      BoundingBox: obj
    }
  }
}

export const updateMoodData = (data) => {
  return {
    type: "UPDATE_MOOD_DATA",
    payload: data
  }
}

export const setPertemuan = (str) => {
  return {
    type: 'SET_PERTEMUAN',
    payload: str
  }
}

export const Flag_Login = () => {
  //console.log("this.props.flagLogin di jalankan");
  return {
    type: 'SET_FLAG',
    payload: true
  }
}

export const setImageToCompare = (file) => {
  return {
    type: 'SET_IMAGE_TO_COMPARE',
    payload: file
  }
}

export const setAbsentionToCheck = (obj) => {
  return {
    type: 'SET_ABSENT_TO_CHECK',
    payload: obj
  }
}

export const loginGo = (objLogin) => {
  //console.log('actions loginGo: ', objLogin);
  return (dispatch, getState) => {
    const apiUrl = 'https://erwar.id/api/users/signin'
    axios.post(apiUrl, {...objLogin})
    .then((resp) => {
      if (resp.data.msg !== "Invalid username" || resp.data.msg !== "Invalid Password") {
        //console.log(resp, 'ini reps after hit loginGo');
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('username', resp.data.username)
        localStorage.setItem('id', resp.data.id)
        dispatch(Flag_Login())
      }
    }).catch(err => console.log(err))
  }
}

export const setCurrUser = (objUser) => {
  //console.log('actions.js setCurrUser: dijalankan');
  return {
    type: 'SET_CURR_USER',
    payload: objUser
  }
}

export const signupGo = (objSignup) => {
  //console.log(objSignup);
  return (dispatch, getState) => {
    const apiUrl = 'https://erwar.id/api/users/signup'
    axios.post(apiUrl, {...objSignup})
    .then((resp) => {
      dispatch(Get_Flag_SignIn())

    }).catch(err => console.log(err))
  }
}

//update hasil absent to database
export const saveResultAbsent = (objAbsent) => {
  //console.log('action, saveResultAbsent, objnya: ', objAbsent);
  return (dispatch, getState) => {
    const apiUrl = 'https://erwar.id/api/absents/'+objAbsent._id
    axios.put(apiUrl, objAbsent)
    .then((resp) => {
      //console.log('sukses update : ', resp.data);
    }).catch(err => console.log(err))
  }
}

// START UNTUK WARNA SAAT DI KLIK DI MENU BAR
export const takeAbsentSTATUS = (isaktive) => {
  return {
    type: 'GET_STATUS_TAKE_ABSENT',
    payload: isaktive
  }
}

export const addNewStudentSTATUS = (isaktive) => {
  return {
    type: 'GET_STATUS_ADD_NEW_STUDENT',
    payload: isaktive
  }
}

// END MENUBAR

export const Fetch_Student = (obj) => {
  return {
    type: 'FETCH_DATA_STUDENT',
    payload: obj
  }
}

export const Fetch_DataStudent = (idUser) => {
  return (dispatch, getState) => {
    const apiUrl = 'https://erwar.id/api/classList/user/'+idUser
    axios.get(apiUrl)
    .then((resp) => {
      dispatch(Fetch_Student(resp.data))
    })
    .catch((err) => console.log(err))
  }
}

export const Fetch_Student_Detail = (obj) => {
  return {
    type: 'FETCH_DATA_STUDENT_DETAIL',
    payload: obj
  }
}

export const Fetch_DataStudent_Detail = (className, idUser) => {
  //console.log('actions : ini clas apa: ', className);
  //console.log('actions : usernya siapa: ', idUser);
  return (dispatch, getState) => {
    const apiUrl = 'https://erwar.id/api/students/class/'+className+'/'+idUser
    axios.get(apiUrl)
    .then((resp) => {
      dispatch(Fetch_Student_Detail(resp.data))
    })
    .catch((err) => console.log(err))
  }
}

export const Clear_Fetch_DataStudent_Detail = () => {
  return {
    type: 'FETCH_DATA_STUDENT_DETAIL',
    payload: []
  }
}
